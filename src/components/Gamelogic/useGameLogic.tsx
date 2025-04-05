import {useRef} from 'react';
import {Animated} from 'react-native';
import {State} from 'react-native-gesture-handler';
import {playSound} from '../../utils/SoundUtility';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  checkForMatches,
  clearMatches,
  fillRandomCandies,
  handleShuffleAndClear,
  hasPossibleMoves,
  shiftDown,
} from './gridUtils';

const useGameLogic = (data: any[][], setData: (data: any) => any) => {
  const animatedValues = useRef(
    data?.map(row =>
      row.map(tile =>
        tile === null
          ? null
          : {x: new Animated.Value(0), y: new Animated.Value(0)},
      ),
    ),
  ).current;

  const handleSwipe = async (
    rowIndex: number,
    colIndex: number,
    direction: 'right' | 'left' | 'down' | 'up',
    setCollectedCandies: any,
  ) => {
    playSound('candy_shuffle');

    let newGrid = JSON.parse(JSON.stringify(data));
    let targetRow = rowIndex;
    let targetCol = colIndex;

    if (direction === 'up') targetRow -= 1;
    if (direction === 'down') targetRow += 1;
    if (direction === 'left') targetCol -= 1;
    if (direction === 'right') targetCol += 1;

    // check bounds and skip null tiles
    if (
      targetRow >= 0 &&
      targetRow < data?.length &&
      targetCol >= 0 &&
      targetCol < data[0].length &&
      data[rowIndex][colIndex] != null &&
      data[targetRow][targetCol] != null
    ) {
      const targetTileAnimationX = Animated.timing(
        animatedValues[targetRow][targetCol]!.x,
        {
          toValue: (colIndex - targetCol) * RFPercentage(5),
          duration: 200,
          useNativeDriver: true,
        },
      );
      const targetTileAnimationY = Animated.timing(
        animatedValues[targetRow][targetCol]!.y,
        {
          toValue: (rowIndex - targetRow) * RFPercentage(5),
          duration: 200,
          useNativeDriver: true,
        },
      );

      const sourceTileAnimationX = Animated.timing(
        animatedValues[rowIndex][colIndex]!.x,
        {
          toValue: (targetCol - colIndex) * RFPercentage(5),
          duration: 200,
          useNativeDriver: true,
        },
      );
      const sourceTileAnimationY = Animated.timing(
        animatedValues[rowIndex][colIndex]!.y,
        {
          toValue: (targetRow - rowIndex) * RFPercentage(5),
          duration: 200,
          useNativeDriver: true,
        },
      );

      Animated.parallel([
        targetTileAnimationX,
        targetTileAnimationY,
        sourceTileAnimationX,
        sourceTileAnimationY,
      ]).start(async () => {
        [newGrid[rowIndex][colIndex], newGrid[targetRow][targetCol]] = [
          newGrid[targetRow][targetCol],
          newGrid[rowIndex][colIndex],
        ];

        let matches = await checkForMatches(newGrid);

        if (matches?.length > 0) {
          let totalClearedCandies = 0;
          while (matches?.length > 0) {
            playSound('candy_clear');
            totalClearedCandies += matches.length;
            newGrid = await clearMatches(newGrid, matches);
            newGrid = await shiftDown(newGrid);
            newGrid = await fillRandomCandies(newGrid);

            matches = await checkForMatches(newGrid);
          }

          animatedValues[rowIndex][colIndex]!.x.setValue(0);
          animatedValues[rowIndex][colIndex]!.y.setValue(0);
          animatedValues[targetRow][targetCol]!.x.setValue(0);
          animatedValues[targetRow][targetCol]!.y.setValue(0);

          setData(newGrid);

          const hasMoves = await hasPossibleMoves(newGrid);
          if (!hasMoves) {
            const d = await handleShuffleAndClear(newGrid);
            newGrid = d.grid;
            totalClearedCandies += d.clearedMatches;
            while (!(await hasPossibleMoves(newGrid))) {
              const p = await handleShuffleAndClear(newGrid);
              newGrid = p.grid;
              totalClearedCandies += p.clearedMatches;
            }
            setData(newGrid);
          }
          setCollectedCandies(
            (prevCount: number) => prevCount + totalClearedCandies,
          );
        } else {
          animatedValues[rowIndex][colIndex]!.x.setValue(0);
          animatedValues[rowIndex][colIndex]!.y.setValue(0);
          animatedValues[targetRow][targetCol]!.x.setValue(0);
          animatedValues[targetRow][targetCol]!.y.setValue(0);
          setData(data);
        }
      });
    }
  };

  const handleGesture = async (
    event: any,
    rowindex: number,
    colIndex: number,
    state: any,
    setCollectedCandies: any,
  ) => {
    if (data[rowindex][colIndex] === null) {
      return;
    }

    if (state === State.END) {
      const {translationX, translationY} = event.nativeEvent;
      const absX = Math.abs(translationX);
      const absY = Math.abs(translationY);

      if (absX > absY) {
        if (translationX > 0) {
          //right
          await handleSwipe(rowindex, colIndex, 'right', setCollectedCandies);
          console.log('righr');
        } else {
          //left
          await handleSwipe(rowindex, colIndex, 'left', setCollectedCandies);
          console.log('left');
        }
      } else {
        if (translationY > 0) {
          //down
          await handleSwipe(rowindex, colIndex, 'down', setCollectedCandies);
          console.log('down');
        } else {
          //up
          await handleSwipe(rowindex, colIndex, 'up', setCollectedCandies);
          console.log('up');
        }
      }
    }
  };

  return {
    handleGesture,
    animatedValues,
  };
};

export default useGameLogic;

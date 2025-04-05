import {View, Text, StyleSheet, Animated} from 'react-native';
import React, {FC} from 'react';
import {screenHeight} from '../../utils/Constants';
import {
  gestureHandlerRootHOC,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {getCandyImage} from '../../utils/data';
import useGameLogic from '../Gamelogic/useGameLogic';

const GameTile: FC<{
  data: any[][];
  setData: (data: any) => any;
  setCollectedCandies: (data: any) => any;
}> = ({data, setData, setCollectedCandies}) => {
  // Return null if data is not yet initialized
  if (!data) {
    return null;
  }

  const {handleGesture, animatedValues} = useGameLogic(data, setData);

  return (
    <View style={styles.flex2}>
      {data?.map((row, rowIndex) => {
        return (
          <View key={rowIndex} style={styles.row}>
            {row?.map((tile, colIndex) => {
              return (
                <PanGestureHandler
                  key={`${rowIndex}-${colIndex}`}
                  onGestureEvent={event => {
                    handleGesture(
                      event,
                      rowIndex,
                      colIndex,
                      State.ACTIVE,
                      setCollectedCandies,
                    );
                  }}
                  onHandlerStateChange={event => {
                    handleGesture(
                      event,
                      rowIndex,
                      colIndex,
                      event?.nativeEvent?.state,
                      setCollectedCandies,
                    );
                  }}>
                  <View
                    style={[
                      styles.tile,
                      tile == null ? styles.emptyTile : styles.filledTile,
                    ]}>
                    {tile != null && (
                      <Animated.Image
                        source={getCandyImage(tile)}
                        style={[
                          styles.candy,
                          tile == null ||
                          !animatedValues?.[rowIndex]?.[colIndex]
                            ? {}
                            : {
                                transform: [
                                  {
                                    translateX:
                                      animatedValues[rowIndex][colIndex]?.x,
                                  },
                                  {
                                    translateY:
                                      animatedValues[rowIndex][colIndex]?.y,
                                  },
                                ],
                              },
                        ]}
                        resizeMode={'contain'}
                      />
                    )}
                  </View>
                </PanGestureHandler>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  flex2: {
    height: screenHeight * 0.7,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  tile: {
    width: RFPercentage(6.5),
    height: RFPercentage(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  emptyTile: {
    backgroundColor: 'transparent',
  },
  filledTile: {
    backgroundColor: '#326E9A',
    borderWidth: 0.6,
    borderColor: '#666',
  },
  candy: {
    width: '80%',
    height: '80%',
  },
});

export default gestureHandlerRootHOC(GameTile);

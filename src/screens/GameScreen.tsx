import {View, Text, ImageBackground} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import GameHeader from '../components/Game/GameHeader';
import {commonStyles} from '../styles/commonStyles';
import {useRoute} from '@react-navigation/native';
import {useSound} from '../navigation/SoundContext';
import GameFooter from '../components/Game/GameFooter';
import GameTile from '../components/Game/GameTile';

const GameScreen: FC = () => {
  const route = useRoute();
  const item = route?.params as any;
  const {playSound} = useSound();
  const [gridData, setGridData] = useState<any>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [time, setTime] = useState<any>();
  const [collectedCandies, setCollectedCandies] = useState<number>(0);

  useEffect(() => {
    if (item?.level) {
      setGridData(item?.level?.grid);
      setTotalCount(item?.level?.pass);
      setTime(item?.level?.time);
    }
  }, []);

  return (
    <ImageBackground
      style={commonStyles.simpleContainer}
      source={require('../assets/images/b1.png')}>
      <GameHeader
        totalCount={totalCount}
        collectedCandies={collectedCandies}
        time={time}
      />

      <GameTile
        data={gridData}
        setData={setGridData}
        setCollectedCandies={setCollectedCandies}
      />

      <GameFooter />
    </ImageBackground>
  );
};

export default GameScreen;

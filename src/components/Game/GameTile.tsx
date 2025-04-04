import {View, Text, StyleSheet, Animated} from 'react-native';
import React, {FC} from 'react';
import {screenHeight} from '../../utils/Constants';
import {
  gestureHandlerRootHOC,
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {getCandyImage} from '../../utils/data';

const GameTile: FC<{
  data: any[][];
  setData: (data: any) => any;
  setCollectedCandies: (data: any) => any;
}> = ({data, setData, setCollectedCandies}) => {
  return (
    <View style={styles.flex2}>
      {data?.map((row, index) => {
        return (
          <View key={index} style={styles.row}>
            {row?.map((tile, colIdx) => {
              return (
                <PanGestureHandler
                  key={`${index}-${colIdx}`}
                  onGestureEvent={event => {}}
                  onHandlerStateChange={event => {}}>
                  <View
                    style={[
                      styles.tile,
                      tile == null ? styles.emptyTile : styles.filledTile,
                    ]}>
                    {tile != null && (
                      <Animated.Image
                        source={getCandyImage(tile)}
                        style={[styles.candy]}
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

import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {screenHeight} from '../../utils/Constants';
import ScalePress from '../UI/ScalePress';
import {goBack} from '../../utils/NavigationUtil';

const GameFooter = () => {
  return (
    <View style={styles.flex1}>
      <ScalePress onPress={() => goBack()}>
        <Image
          source={require('../../assets/icons/close.png')}
          style={styles.closeIcon}
        />
      </ScalePress>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    width: '100%',
    height: screenHeight * 0.1,
    paddingHorizontal: 10,
  },
  closeIcon: {
    height: 45,
    width: 45,
    resizeMode: 'contain',
  },
});

export default GameFooter;

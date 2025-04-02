import {View, Text, ImageBackground, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {commonStyles} from '../styles/commonStyles';
import {screenHeight, screenWidth} from '../utils/Constants';
import {useIsFocused} from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const translateY = useSharedValue(-200);

  useEffect(() => {
    translateY.value = withTiming(0, {duration: 3000});
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <ImageBackground
      source={require('../assets/images/b2.png')}
      style={commonStyles.simpleContainer}>
      <Animated.Image
        source={require('../assets/images/banner.png')}
        style={[styles.img, animatedStyle]}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  img: {
    width: screenWidth,
    height: screenWidth * 0.8,
    position: 'absolute',
    top: -20,
    resizeMode: 'contain',
  },
});

export default HomeScreen;

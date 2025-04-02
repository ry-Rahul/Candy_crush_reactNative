import {View, Text, ImageBackground, Image} from 'react-native';
import React, {useEffect} from 'react';
import {commonStyles} from '../styles/commonStyles';
import { resetAndNavigate } from '../utils/NavigationUtil';

const SplashScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      resetAndNavigate('HomeScreen');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={commonStyles.container}>
      <Image
        source={require('../assets/text/logo.png')}
        style={commonStyles.img}
      />
    </ImageBackground>
  );
};

export default SplashScreen;

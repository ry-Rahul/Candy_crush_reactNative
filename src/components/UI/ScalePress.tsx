import {View, Text, ViewStyle, Animated, TouchableOpacity} from 'react-native';
import React, {FC, useState} from 'react';
import {playSound} from '../../utils/SoundUtility';

interface ScalePressProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}
const ScalePress: FC<ScalePressProps> = ({children, onPress, style}) => {
  const scaleValue = new Animated.Value(1);

  const onPressIn = () => {
    playSound('ui');
    Animated.spring(scaleValue, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={{...style}}>
      <Animated.View style={{transform: [{scale: scaleValue}]}}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ScalePress;

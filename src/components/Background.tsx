import React from 'react';
import {View} from 'react-native';

export const Background = () => {
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: '#0D0D0D',
        top: -230,
        width: 800,
        height: 1000,
        transform: [{rotate: '-70deg'}],
      }}
    />
  );
};

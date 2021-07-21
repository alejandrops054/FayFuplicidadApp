import React from 'react';
import {Image, View} from 'react-native';

export const WhiteLogo = () => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <Image
        source={require('../../assets/ea5d9298-afff-4553-83f6-95be3dfb8603.jpg')}
        style={{
          width: 200,
          height: 100,
        }}
      />
    </View>
  );
};

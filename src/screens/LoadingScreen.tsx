import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {sytyleLoading} from '../theme/LoadingTheme';

export const LoadingScreen = () => {
  return (
    <View style={sytyleLoading.View}>
      <Text>Hola</Text>
      <ActivityIndicator size={50} color="#fff" />
    </View>
  );
};

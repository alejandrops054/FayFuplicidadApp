import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TiendasScreen} from '../screens/TiendasScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tiendas" component={TiendasScreen} />
      {/*<Tab.Screen name="salir" component={}/>
      <Tab.Screen name="Configuracion" />*/}
    </Tab.Navigator>
  );
};

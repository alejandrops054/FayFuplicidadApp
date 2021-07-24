import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CampañasScreen} from '../screens/CampañasScreen';
import {TiendasScreen} from '../screens/TiendasScreen';

export type TiendasStackParams = {
  TiendasScreen: undefined;
  CampañasScreen: {id?: string; tienda_nombre?: string};
};

const Stack = createStackNavigator<TiendasStackParams>();
export const TiendasNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: '#fff'},
        headerStyle: {
          elevation: 0,
          backgroundColor: '#730217',
        },
      }}>
      <Stack.Screen
        name="TiendasScreen"
        component={TiendasScreen}
        options={{
          title: 'Tiendas',
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />

      <Stack.Screen name="CampañasScreen" component={CampañasScreen} />
    </Stack.Navigator>
  );
};

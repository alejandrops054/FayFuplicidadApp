import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CampañasScreen} from '../screens/CampañasScreen';
import {TiendasScreen} from '../screens/TiendasScreen';
import {DetalleScreen} from '../screens/DetalleScreen';

export type TiendasStackParams = {
  TiendasScreen: undefined;
  CampañasScreen: {tienda_id?: string};
  DetalleScreen: {info_id?: string};
};

console.log('id campañas ', CampañasScreen);

const Stack = createStackNavigator<TiendasStackParams>();
export const TiendasNavigation = () => {
  return (
    <>
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

        <Stack.Screen
          name="CampañasScreen"
          component={CampañasScreen}
          options={{
            title: 'Campaña',
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: 'bold'},
          }}
        />

        <Stack.Screen
          name="DetalleScreen"
          component={DetalleScreen}
          options={{
            title: 'Detalles',
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: 'bold'},
          }}
        />
      </Stack.Navigator>
    </>
  );
};

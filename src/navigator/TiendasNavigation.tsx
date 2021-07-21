import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TiendaScreen} from '../screens/TiendaScreen';

export type TiendasStackParams = {
  TiendasScreen: undefined;
  TiendaScreen: {id?: string; tiendaNombre?: string};
};

const Stack = createStackNavigator<TiendasStackParams>();
export const TiendasNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: 'white'},
        headerStyle: {
          elevation: 0,
          backgroundColor: '#730217',
        },
      }}>
      <Stack.Screen
        name="TiendasScreen"
        component={TiendaScreen}
        options={{title: 'Tiendas'}}
      />

      <Stack.Screen name="TiendaScreen" component={TiendaScreen} />
    </Stack.Navigator>
  );
};

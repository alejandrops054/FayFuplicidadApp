import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {LoginScreens} from '../screens/LoginScreens';
import {ProtectdScreen} from '../screens/ProtectdScreen';
import {AuthContext} from '../context/AuthContext';
const Stack = createStackNavigator();

export const Navigation = () => {
  const {status} = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}>
      {/*Condicion de autenticacion de usuario logiado*/}
      {status !== 'authenticated' ? (
        <>
          <Stack.Screen name="LoginScreens" component={LoginScreens} />
        </>
      ) : (
        <>
          <Stack.Screen name="ProtectdScreen" component={ProtectdScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

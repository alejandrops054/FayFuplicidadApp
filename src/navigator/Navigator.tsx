import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreens} from '../screens/LoginScreens';
import {ProtectdScreen} from '../screens/ProtectdScreen';
import {AuthContext} from '../context/AuthContext';
import {LoadingScreen} from '../screens/LoadingScreen';
import {TiendasNavigation} from './TiendasNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {TabNavigator} from './HomeNavigator';

const Stack = createStackNavigator();

export const Navigation = () => {
  const {status} = useContext(AuthContext);

  //if (status === 'cheching') return <LoadingScreen />;
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
          <Stack.Screen
            name="TiendasNavigation"
            component={TiendasNavigation}
          />
          {/*<Stack.Screen name="TabNavigator" component={TabNavigator} />*/}
          <Stack.Screen name="ProtectdScreen" component={ProtectdScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

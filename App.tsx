import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './src/navigator/Navigator';
import {AuthProvider} from './src/context/AuthContext';
import {TiendasProvider} from './src/context/TiendasContext';

const AppState = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return (
    <AuthProvider>
      <TiendasProvider>{children}</TiendasProvider>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigation />
      </AppState>
    </NavigationContainer>
  );
};

export default App;

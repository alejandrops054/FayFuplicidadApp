import React, {createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginData, LoginResponse, User} from '../Interfaces/app-interface';
import {authReducer, AuthState} from './authReducer';
import fayApi from '../api/fayApi';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: User | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: () => void;
  signIn: (loginData: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

const AuthInicialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};
export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, AuthInicialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');

    //No token, no autenticado
    if (!token) return dispatch({type: 'noAuthenticated'});

    //Hay token
    const resp = await fayApi.post('/auth/token');
    if (resp.status !== 200) {
      return dispatch({type: 'noAuthenticated'});
    }
    dispatch({
      type: 'signUp',
      payload: {
        token: resp.data.token,
        user: resp.data.user,
      },
    });
  };

  const signIn = async ({email, password}: LoginData) => {
    try {
      const {data} = await fayApi.post<LoginResponse>('/auth/token', {
        email,
        password,
        device_name: 'mobile',
      });

      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.user,
        },
      });

      await AsyncStorage.setItem('token', data.token);
      console.log(data);
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: 'addError',
        payload:
          error.response.data.msg ||
          'Usuario / password incorrecto, intentalo de nuevo',
      });
    }
  };
  const signUp = () => {};

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'logout'});
  };

  const removeError = () => {
    dispatch({
      type: 'removeError',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, {createContext, useEffect, useState} from 'react';
import {AppRegistry, PanResponder} from 'react-native';
import fayApi from '../api/fayApi';
import {
  TiendasResponse,
  CampsResponse,
  Tienda,
} from '../Interfaces/app-interface';

//se declara funciones
type TiendasContextProps = {
  //indicamos valores ../interface del JSON Tiendas
  tienda: TiendasResponse[];
  loadTiendas: () => Promise<void>;
};

export const TiendasContext = createContext({} as TiendasContextProps);

export const TiendasProvider = ({children}: any) => {
  const [tienda, setTiendas] = useState<TiendasResponse[]>([]);

  useEffect(() => {
    loadTiendas();
  }, []);

  //const para mostrar toda las tiendas
  const loadTiendas = async () => {
    const resp = await fayApi.get('/tiendas');

    ///se destructura las tiendas ya existentes
    setTiendas([...resp.data]);
    console.log('JSON de las tiendas', resp.data);
  };

  return (
    <TiendasContext.Provider
      value={{
        tienda,
        loadTiendas,
      }}>
      {children}
    </TiendasContext.Provider>
  );
};

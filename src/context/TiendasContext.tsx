import {resolvePlugin} from '@babel/core';
import React, {createContext, useEffect, useState} from 'react';
import {AppRegistry} from 'react-native';
import fayApi from '../api/fayApi';
import {TiendasResponse} from '../Interfaces/app-interface';

type TiendasContextProps = {
  tiendas: TiendasResponse[];
  loadTiendas: () => Promise<void>;
  addTiendas: (id: string, tiendaNombre: string) => Promise<void>;
  updateTienda: (
    id: string,
    tiendaNombre: string,
    tiendaClave: string,
  ) => Promise<void>;
  deleteTienda: (id: string) => Promise<void>;
  loadTiendaById: (id: string) => Promise<TiendasResponse>;
};

export const TiendasContext = createContext({} as TiendasContextProps);

export const TiendasProvider = ({children}: any) => {
  const [tiendas, setTiendas] = useState<TiendasResponse[]>([]);

  useEffect(() => {
    loadTiendas();
  }, []);

  const loadTiendas = async () => {
    const resp = await fayApi.get<TiendasResponse>('/tiendas');

    setTiendas([resp.data]);
    console.log('JSON de las tiendas', resp.data);
  };

  const addTiendas = async (id: string, tiendaNombre: string) => {};
  const updateTienda = async (
    id: string,
    tiendaNombre: string,
    tiendaClave: string,
  ) => {};

  const deleteTienda = async (id: string) => {};
  const loadTiendaById = async (id: string) => {
    throw new Error('Not implemented');
  };
  return (
    <TiendasContext.Provider
      value={{
        tiendas,
        loadTiendas,
        addTiendas,
        updateTienda,
        deleteTienda,
        loadTiendaById,
      }}>
      {children}
    </TiendasContext.Provider>
  );
};
function async(arg0: {
  data: any;
}):
  | ((
      value: import('axios').AxiosResponse<any>,
    ) =>
      | import('axios').AxiosResponse<any>
      | PromiseLike<import('axios').AxiosResponse<any>>)
  | null
  | undefined {
  throw new Error('Function not implemented.');
}

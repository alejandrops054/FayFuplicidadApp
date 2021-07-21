import {resolvePlugin} from '@babel/core';
import React, {createContext, useEffect, useState} from 'react';
import {AppRegistry} from 'react-native';
import fayApi from '../api/fayApi';
import {TiendasResponse} from '../Interfaces/app-interface';

type TiendasContextProps = {
  tiendas: TiendasResponse[];
  loadTiendas: () => Promise<void>;
  addTiendas: (tiendaId: string, tiendaNombre: string) => Promise<void>;
  updateTienda: (
    id: string,
    tiendaNombre: string,
    tiendaClave: string,
  ) => Promise<void>;
  deleteTienda: (id: string) => Promise<void>;
  loadTiendaById: (id: string) => Promise<void>;
};

export const TiendasContext = createContext({} as TiendasContextProps);

export const TiendasProvider = ({children}: any) => {
  const [tiendas, setTiendas] = useState<TiendasResponse[]>([]);

  useEffect(() => {
    loadTiendas();
  }, []);

  const loadTiendas = async () => {
    const resp = await fayApi.get<TiendasResponse>('/tiendas');
    //se destructura las tiendas ya existentes
    setTiendas([...resp.data.tiendas]);
    console.log(resp.data.tiendas);
  };

  const addTiendas = async (tiendaId: string, tiendaNombre: string) => {};
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

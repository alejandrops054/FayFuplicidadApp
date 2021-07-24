import React, {createContext, useEffect, useState} from 'react';
import {AppRegistry} from 'react-native';
import fayApi from '../api/fayApi';
import {TiendasResponse, CadenaNombre} from '../Interfaces/app-interface';

//se declara funciones
type TiendasContextProps = {
  //indicamos valores ../interface del JSON Tiendas
  tienda: TiendasResponse[];
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
  const [tienda, setTiendas] = useState<TiendasResponse[]>([]);

  useEffect(() => {
    loadTiendas();
  }, []);

  //const para mostrar toda las tiendas
  const loadTiendas = async () => {
    const resp = await fayApi.get('/tiendas?limite=20');

    ///se destructura las tiendas ya existentes
    setTiendas([...resp.data]);
    console.log('JSON de las tiendas', ...resp.data);
    return resp.data;
  };

  //se queda preparado el codigo para escalar aplicacion
  //const para agregar tiendas
  const addTiendas = async (id: string, tiendaNombre: string) => {};

  //const para actualizar datos de la tiendas
  const updateTienda = async (
    id: string,
    tiendaNombre: string,
    tiendaClave: string,
  ) => {};

  //const para elimiar tiendas
  const deleteTienda = async (id: string) => {};

  //const para actualizar
  const loadTiendaById = async (id: string) => {
    throw new Error('Not implemented');
  };
  return (
    <TiendasContext.Provider
      value={{
        tienda,
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

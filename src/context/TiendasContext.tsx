import React, {createContext, useEffect, useState} from 'react';
import {AppRegistry, PanResponder} from 'react-native';
import fayApi from '../api/fayApi';
import {
  TiendasResponse,
  CampsResponse,
  Tienda,
} from '../Interfaces/app-interface';
import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

//se declara funciones
type TiendasContextProps = {
  //indicamos valores ../interface del JSON Tiendas
  tienda: TiendasResponse[];
  loadTiendas: () => Promise<void>;
};

//sqlite
//consulta de db
const tableName = 'dbFayPublicidad';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'dbFayPublicidad.db', location: 'default'});
};

export const cretateTable = async (db: SQLiteDatabase) => {
  //crante tabla en caso de no existir
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
    value TEXT NOT NULL
);`;

  await db.executeSql(query);
};

export const getTooItem = async (
  db: SQLiteDatabase,
): Promise<TiendasResponse[]> => {
  try {
    const tiendaItems: TiendasResponse[] = [];
    const results = await db.executeSql(
      `SELECT rowid as id,value FROM ${tableName}`,
    );

    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        tiendaItems.push(results.rows.item(index));
      }
    });
    return tiendaItems;
  } catch (error) {
    console.error(error);
    throw Error('Fallo el get item');
  }
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

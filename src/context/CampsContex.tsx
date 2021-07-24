import React, {createContext, useEffect, useState} from 'react';
import fayApi from '../api/fayApi';
import {CampsResponse, TiendasResponse} from '../Interfaces/app-interface';

type CampsContextPros = {
  camps: CampsResponse[];
  loadCamps: (tienda_id: string) => Promise<void>;
};

export const CampsContext = createContext({} as CampsContextPros);

export const CampsProvider = ({children}: any) => {
  const [camps, setCamps] = useState<CampsResponse[]>([]);

  useEffect(() => {
    loadCamps();
  }, []);

  const loadCamps = async () => {
    const resp = await fayApi.get('camps');
    setCamps([...resp.data]);
    console.log('Data Camps', ...resp.data);

    return resp.data;
  };

  return (
    <CampsContext.Provider value={{camps, loadCamps}}>
      {children}
    </CampsContext.Provider>
  );
};

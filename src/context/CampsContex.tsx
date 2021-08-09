import React, {createContext, useEffect, useState} from 'react';
import fayApi from '../api/fayApi';
import {CampsResponse, TiendasResponse} from '../Interfaces/app-interface';

type CampsContextPros = {
  camping: CampsResponse[];
  loadCamps: (tienda_id: string) => Promise<void>;
};

export const CampsContext = createContext({} as CampsContextPros);

export const CampsProvider = ({children}: any) => {
  const [camping, setCamps] = useState<CampsResponse[]>([]);

  const loadCamps = async (tienda_id: string) => {
    const resp = await fayApi.get(`/camps${tienda_id}`);
    setCamps([resp.data]);
    console.log('Data Camps', resp.data);
    return resp.data;
  };

  return (
    <CampsContext.Provider value={{camping, loadCamps}}>
      {children}
    </CampsContext.Provider>
  );
};

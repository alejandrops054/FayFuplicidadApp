import React, {createContext, useEffect, useState} from 'react';
import fayApi from '../api/fayApi';
import {CampsResponse, TiendasResponse} from '../Interfaces/app-interface';

type CampsContextPros = {
  camps: CampsResponse[];
  loadCamps: () => Promise<void>;
};

export const CampsContext = createContext({} as CampsContextPros);

export const CampsProvider = ({route, children}: any) => {
  const [camps, setCamps] = useState<CampsResponse[]>([]);
  const {tienda_id} = route.params;

  useEffect(() => {
    loadCamps();
  }, []);

  const loadCamps = async () => {
    const resp = await fayApi.get('/camps', {
      params: {
        tienda_id: tienda_id,
      },
    });
    setCamps([...resp.data]);
    console.log('Data Camps', ...resp.data);
  };

  return (
    <CampsContext.Provider value={{camps, loadCamps}}>
      {children}
    </CampsContext.Provider>
  );
};

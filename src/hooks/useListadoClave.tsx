import {useState, useEffect} from 'react';
import fayApi from '../api/fayApi';
import {ClavesResponse} from '../Interfaces/app-interface';

export const useListadoClave = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [claves, setClaves] = useState<ClavesResponse[]>([]);

  useEffect(() => {
    getListadoClaves();
  }, []);

  const getListadoClaves = async () => {
    const resp = await fayApi.get('/listado-claves');

    setClaves(resp.data);
    setIsLoading(false);
  };
  return {
    isLoading,
    claves,
  };
};

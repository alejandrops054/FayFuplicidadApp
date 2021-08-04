import {useEffect, useState} from 'react';
import fayApi from '../api/fayApi';
import {CampsResponse} from '../Interfaces/app-interface';

export const useCamps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [camps, seCamps] = useState<CampsResponse[]>([]);

  useEffect(() => {
    getCamps();
  }, []);

  const getCamps = async () => {
    const resp = await fayApi.get('/camps');
    seCamps(resp.data);
    setIsLoading(false);
  };

  return {
    isLoading,
    camps,
  };
};

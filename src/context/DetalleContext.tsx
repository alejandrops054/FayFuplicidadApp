import React, {createContext, useEffect, useState} from 'react';
import {ImagePickerResponse} from 'react-native-image-picker';
import fayApi from '../api/fayApi';
import {DetallesResponse} from '../Interfaces/app-interface';

type DetallesContextProps = {
  detalles: DetallesResponse[];

  loadDataDetalles: (info_id: string) => Promise<void>;
  loadDetalles: (info_id: string) => Promise<DetallesResponse>;
  addDetalles: (imagen: string) => Promise<void>;
  uploadImagen: (data: any, info_id: string) => Promise<void>;
};

export const DetallesContext = createContext({} as DetallesContextProps);

export const DetalleContext = ({children, route}: any) => {
  const {info_id} = route.params;
  const [detalles, setDetalles] = useState<DetallesResponse[]>([]);

  const loadDataDetalles = async () => {
    const resp = await fayApi.get('/info-id', {
      params: {id: info_id},
    });
    console.log('data desde el context info_id', info_id);

    setDetalles([resp.data]);
    console.log('mando params del contex', resp.data);
  };

  const loadDetalles = async (info_id: string): Promise<DetallesResponse> => {
    const resp = await fayApi.get<DetallesResponse>(`/info-id/${info_id}`);

    setDetalles([resp.data]);
    console.log('mandando id en contex info ', resp.data);
    return resp.data;
  };

  const addDetalles = async (imagen: string): Promise<void> => {
    const resp = await fayApi.post('/enviar-informacion', {
      imagen: imagen,
    });

    setDetalles([resp.data]);
    console.log('enviando data al post', resp.data);
    return resp.data;
  };

  const uploadImagen = async (data: ImagePickerResponse, info_id: string) => {
    const filToUpload = {
      uri: data.assets![0].uri,
      type: data.assets![0].type,
      name: data.assets![0].fileName,
    };

    console.log('data filToUpload', filToUpload);

    const formData = new FormData();
    formData.append('imagen', filToUpload);

    try {
      const resp = await fayApi.post(
        `/enviar-informacion/${info_id}`,
        formData,
      );
      console.log(resp);
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <DetallesContext.Provider
      value={{
        detalles,
        loadDataDetalles,
        loadDetalles,
        addDetalles,
        uploadImagen,
      }}>
      {children}
    </DetallesContext.Provider>
  );
};

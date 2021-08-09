import {Picker} from '@react-native-picker/picker';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Image,
  RefreshControlBase,
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  View,
  Platform,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Card, Paragraph, Title} from 'react-native-paper';
import fayApi from '../api/fayApi';
import {DetallesContext} from '../context/DetalleContext';
import {useForm} from '../hooks/useForm';
import {useListadoClave} from '../hooks/useListadoClave';
import {TiendasStackParams} from '../navigator/TiendasNavigation';
import {sytyleDetalleTheme} from '../theme/detalleTheme';

interface Props extends StackScreenProps<TiendasStackParams, 'DetalleScreen'> {}

export const DetalleScreen = ({route, navigation}: Props) => {
  const [tempUri, setTempUri] = useState<string>();
  const {info_id = ''} = route.params;
  const [camp, setCamps] = useState('');
  const [tiendas, setTienda] = useState('');
  const [concepto, setConsepto] = useState('');
  const [claveTienda, setClaveTienda] = useState('');
  const {claves} = useListadoClave();

  const {loadDetalles, addDetalles, uploadImagen} = useContext(DetallesContext);
  //carga de nada mas get
  useEffect(() => {
    const fetchData = () => {
      fayApi
        .get('/info-id', {
          params: {
            id: info_id,
          },
        })
        .then(({data}) => {
          setCamps(data.camp);
          setTienda(data.tienda);
          setConsepto(data.concepto);
          setClaveTienda(data.clave);
        });
    };
    fetchData();
  }, []);

  const UselessTextInput = () => {
    return <TextInput editable maxLength={40} />;
  };

  //Formulario
  const {imagen, detalles, clave, comentario, form, onChange} = useForm({
    id: info_id,
    imagen: '',
    camp: camp,
    tienda: tiendas,
    detalles: '',
    clave: '',
    comentario: '',
  });

  useEffect(() => {
    navigation.setOptions({
      title: tiendas ? tiendas : 'Sin tienda',
    });
  }, [tiendas]);

  {
    /*
  //funcion de consula de detalles existentes
  useEffect(() => {
    loadDetatelles();
  }, []);

  //Consulta si ya hay registros de detalles
  const loadDetatelles = async () => {
    if (info_id.length === 0) return;
    const detalle = await loadDetalles(info_id);
    console.log('prueba de loadDetalles', detalle);
  };*/
  }

  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
        cameraType: 'back',
        quality: 0.5,
      },
      resp => {
        if (resp.didCancel) return;
        if (resp.errorCode) return;
        if (resp.errorMessage) return;
        if (!resp.assets![0].uri) return;
        console.log('ruta de la imagen', resp.assets![0].uri);
        setTempUri(resp.assets![0].uri);
        console.log('data resp', resp.assets![0]);
        uploadImag(resp, info_id);
      },
    );
  };

  const takePhotoFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      resp => {
        if (resp.didCancel) return;
        if (!resp.assets![0].uri!) return;
        console.log('url temporal galeria', resp.assets![0].uri!);
        setTempUri(resp.assets![0].uri!);
      },
    );
  };

  const uploadImag = async (data: any, info_id: string) => {
    const filToUpload = {
      name: data.assets![0].fileName,
      type: data.assets![0].type,
      uri: data.assets![0].uri,
    };

    const formData = new FormData();

    formData.append('id', info_id);
    formData.append('camp', camp);
    formData.append('producto', 'producto');
    formData.append('detalles', detalles);
    formData.append('imagenes', filToUpload);
    formData.append('clave', clave);
    formData.append('comentario', comentario);

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Accept-Encoding': 'gzip, deflate, br',
    };

    if (detalles) {
      Alert.alert('No hay comentario');
    }
    if (!clave) {
      Alert.alert('No hay ninguna clave');
    }

    if (clave) {
      try {
        const resp = await fayApi.post('/enviar-informacion', formData, {
          headers,
        });
        console.log(resp);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //se llaman el context DetallesContext por medio de addDetalles
  const saveOrUpdate = async () => {
    fayApi
      .post('/enviar-informacion', {
        id: info_id,
        imagen: imagen,
      })
      .then(response => {
        console.log('respuesta', response);
      });
  };

  return (
    <View style={sytyleDetalleTheme.constainer}>
      <Card>
        <Card.Content>
          <Title style={sytyleDetalleTheme.label}>Detalle</Title>
          <Paragraph style={sytyleDetalleTheme.label}>
            {tiendas} {''}
            {camp} {''}
            {concepto} {claveTienda}
          </Paragraph>
        </Card.Content>
      </Card>
      {/*Picker / Selector */}
      <View style={sytyleDetalleTheme.espacio}></View>
      <Text style={sytyleDetalleTheme.label}>Clave</Text>
      <Picker
        selectedValue={clave}
        onValueChange={value => onChange(value, 'clave')}>
        {claves.map(c => (
          <Picker.Item label={c.descripcion} value={c.id} key={c.id} />
        ))}
      </Picker>
      <Text style={sytyleDetalleTheme.label}>Comentarios</Text>
      <UselessTextInput
        style={sytyleDetalleTheme.textInput}
        multiline
        numberOfLines={40}
        onChangeText={(value: any) => onChangeText(value, 'comentario')}
        value={Text}
      />
      <View style={sytyleDetalleTheme.espacio}></View>
      {/*Si tengo una imagen la muestro*/}
      {imagen.length > 0 && tempUri && (
        <Image source={{uri: imagen}} style={sytyleDetalleTheme.img} />
      )}
      {/*mostrar imagen temporal*/}
      {tempUri && (
        <Image source={{uri: tempUri}} style={sytyleDetalleTheme.img} />
      )}

      <View style={sytyleDetalleTheme.espacio}></View>
      <View style={sytyleDetalleTheme.flex}>
        <Button title="Cámara" color="#730217" onPress={takePhoto} />
        <View style={sytyleDetalleTheme.espacio}></View>
        <Button
          title="Galería"
          color="#730217"
          onPress={takePhotoFromGallery}
        />
      </View>
      <View style={sytyleDetalleTheme.espacio}></View>
      <Button title="Guardar" color="#730217" onPress={saveOrUpdate} />
      <Text>{JSON.stringify(form, null, 5)}</Text>
    </View>
  );
};
function uri(uri: any) {
  throw new Error('Function not implemented.');
}
function onChangeText(value: any, arg1: string) {
  throw new Error('Function not implemented.');
}

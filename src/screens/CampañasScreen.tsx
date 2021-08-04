import React, {useContext, useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {StackScreenProps} from '@react-navigation/stack';
import {TiendasStackParams} from '../navigator/TiendasNavigation';
import {sytyleTiendas} from '../theme/tiendasThemes';
import fayApi from '../api/fayApi';

interface Props
  extends StackScreenProps<TiendasStackParams, 'CampañasScreen'> {}

export const CampañasScreen = ({route, navigation}: Props) => {
  const {tienda_id} = route.params;
  const [camps, setCamps] = useState([]);

  //carga de nada mas get
  useEffect(() => {
    const fetchData = () => {
      fayApi
        .get('/camps', {
          params: {
            tienda_id: tienda_id,
          },
        })
        .then(({data}) => {
          setCamps(data);
        });
    };
    fetchData();
  }, []);

  console.log('data campas', camps.data);

  //PUll refresh
  return (
    <View style={sytyleTiendas.View}>
      <FlatList
        data={camps.data}
        keyExtractor={item => item.info_id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('DetalleScreen', {
                info_id: item.info_id,
              })
            }>
            <Text style={sytyleTiendas.TiendaName}>{item.camp_nombre}</Text>
            <Text style={sytyleTiendas.TiendaName}>{item.concepto}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <View style={sytyleTiendas.seperator}></View>
        )}
      />
    </View>
  );
};

import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import fayApi from '../api/fayApi';
import {StackScreenProps} from '@react-navigation/stack';
import {TiendasContext} from '../context/TiendasContext';
import {TiendasStackParams} from '../navigator/TiendasNavigation';
import {sytyleTiendas} from '../theme/tiendasThemes';
import {SearchBar} from 'react-native-elements';

interface Props extends StackScreenProps<TiendasStackParams, 'TiendasScreen'> {}

export const TiendasScreen = ({navigation}: Props) => {
  const {tienda, loadTiendas} = useContext(TiendasContext);

  console.log('valores del context', tienda);

  //PUll refresh

  return (
    <View style={sytyleTiendas.View}>
      <FlatList
        data={tienda}
        keyExtractor={p => p.id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('CampañasScreen', {
                tienda_id: item.id,
              })
            }>
            <Text style={sytyleTiendas.TiendaName}>
              {item.tienda_nombre} - ({item.tienda_clave})
            </Text>
            <Text style={sytyleTiendas.TiendaName}>
              {item.cadena_nombre} - Porgres: {item.porcentaje}%
            </Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <View style={sytyleTiendas.seperator}></View>
        )}
      />
    </View>
  );
};

import React, {useContext} from 'react';
import {Text, View, FlatList} from 'react-native';
import {TiendasContext} from '../context/TiendasContext';
import {sytyleTiendas} from '../theme/tiendasThemes';

export const TiendasScreen = () => {
  const {tiendas} = useContext(TiendasContext);

  console.log('valores del context', tiendas);

  return (
    <View style={sytyleTiendas.View}>
      <FlatList
        data={tiendas}
        keyExtractor={t => t.id}
        renderItem={({item}) => <Text>{item.tienda_nombre}</Text>}
      />
    </View>
  );
};

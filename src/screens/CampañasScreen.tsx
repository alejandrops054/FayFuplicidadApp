import React, {useContext} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {StackScreenProps} from '@react-navigation/stack';
import {TiendasContext} from '../context/TiendasContext';
import {CampsContext} from '../context/CampsContex';
import {TiendasStackParams} from '../navigator/TiendasNavigation';
import {sytyleTiendas} from '../theme/tiendasThemes';

interface Props
  extends StackScreenProps<TiendasStackParams, 'CampañasScreen'> {}

export const CampañasScreen = ({navigation}: Props) => {
  const {camps} = useContext(CampsContext);

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);

  console.log('valores del context', camps);

  //PUll refresh

  return (
    <View style={sytyleTiendas.View}>
      <FlatList
        data={camps}
        keyExtractor={p => p.tienda_id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            //onPress={() =>navigation.navigate('CampañasScreen', {tienda_id: })}
          >
            <Text style={sytyleTiendas.TiendaName}>{item.tienda}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <View style={sytyleTiendas.seperator}></View>
        )}
      />
    </View>
  );
};

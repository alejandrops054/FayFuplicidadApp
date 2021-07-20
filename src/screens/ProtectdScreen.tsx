import React, {useContext} from 'react';
import {Text, View, Button} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {sytyleProtected} from '../theme/protectedTheme';

export const ProtectdScreen = () => {
  const {user, token, logOut} = useContext(AuthContext);
  return (
    <View style={sytyleProtected.container}>
      <Text style={sytyleProtected.title}>Protecd</Text>
      <Button title="Logout" color="#5856D6" onPress={logOut} />
      <Text>{JSON.stringify(user, null, 5)}</Text>
      <Text>{token}</Text>
    </View>
  );
};

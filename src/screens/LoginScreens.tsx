import React, {useContext, useEffect} from 'react';
import {
  Text,
  Alert,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Background} from '../components/Background';
import {WhiteLogo} from '../components/WhiteLogo';
import {LoginStyle} from '../theme/loginTheme';
import {useForm} from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreens = ({navigation}: Props) => {
  const {signIn, errorMessage, removeError} = useContext(AuthContext);
  const {email, password, form, onChange} = useForm({
    email: '',
    password: '',
  });

  const onLogin = () => {
    console.log({email, password});
    Keyboard.dismiss();
    signIn({email, password});
  };

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('Login incorrecto', errorMessage, [
      {text: 'Ok', onPress: removeError},
    ]);
  }, [errorMessage]);

  return (
    <>
      {/* Background */}
      <Background />

      <KeyboardAvoidingView
        style={LoginStyle.KeyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={LoginStyle.formContainer}>
          {/*Logotipo*/}
          <WhiteLogo />
          <Text style={LoginStyle.title}>Login</Text>
          {/*email*/}
          <Text style={LoginStyle.label}>Email</Text>
          <TextInput
            placeholder="Ingrese su correo"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="#fff"
            style={[
              LoginStyle.inputField,
              Platform.OS === 'ios' && LoginStyle.inputfieldIOS,
            ]}
            selectionColor="#fff"
            onChangeText={value => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onLogin}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {/*Password*/}
          <Text style={LoginStyle.label}>Password</Text>
          <TextInput
            placeholder="Ingrese su contraseña"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="#fff"
            secureTextEntry
            style={[
              LoginStyle.inputField,
              Platform.OS === 'ios' && LoginStyle.inputfieldIOS,
            ]}
            selectionColor="#fff"
            onChangeText={value => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/*Boton login*/}
          <View style={LoginStyle.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={LoginStyle.button}
              onPress={onLogin}>
              <Text style={LoginStyle.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

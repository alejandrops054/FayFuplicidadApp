import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const baseURL = 'http://test.fayweb.mx/api';
const baseURL = 'http://192.168.2.80/api';

const fayApi = axios.create({baseURL});

fayApi.interceptors.request.use(async config => {
  let bearer = 'Bearer ';
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = bearer + token;
  }
  return config;
});

export default fayApi;

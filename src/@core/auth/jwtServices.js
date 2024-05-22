import axios from 'axios';

// ** Utils
import {showToast} from '../../utils/utils';
import {MAIN_URL} from '../../utils/constants';
import {navigateTo} from '../../navigation/utils';

// ** Third Party Packages
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class JwtService {
  jwtConfig = {};

  constructor(jwtOverrideConfig) {
    this.jwtConfig = {...this.jwtConfig, ...jwtOverrideConfig};

    axios.interceptors.request.use(
      async config => {
        const token = await AsyncStorage.getItem('token');
        config.headers.Connection = 'keep-alive';
        config.headers['Content-Type'] = 'application/json';
        config.headers['Access-Control-Request-Method'] = '*';
        config.headers.Authorization = `Bearer ${token}`;

        return config;
      },
      error => Promise.reject(error),
    );

    axios.interceptors.response.use(
      response => response,
      async error => {
        const {response} = error;
        if (response && response.status === 401) {
          await this.removeData('token');
          navigateTo('Auth');
        }

        return Promise.reject(error);
      },
    );
  }

  // ** DONE: Async Storage items has been set
  getData = async key => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      showToast({
        title: 'Fetch token',
        message: 'Failed to fetch token',
        type: 'error',
      });
    }
  };

  setData = async (key, value) => {
    try {
      return await AsyncStorage.setItem(key, value);
    } catch (e) {
      showToast({
        title: 'Set token',
        message: 'Failed to set token',
        type: 'error',
      });
    }
  };

  removeData = async key => {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (e) {
      showToast({
        title: 'Remove token',
        message: 'Failed to remove token',
        type: 'error',
      });
    }
  };

  getAllData = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      showToast({
        title: 'Get all data',
        message: 'Failed to get all data',
        type: 'error',
      });
    }

    return keys;
  };

  clearAllData = async () => {
    try {
      return await AsyncStorage.clear();
    } catch (e) {
      showToast({
        title: 'Clear all data',
        message: 'Failed to clear all data',
        type: 'error',
      });
    }
  };

  // ** API_ENDPOINT: Notification
  notification = async data => {
    const url = `${MAIN_URL}/users/me/notifications/register-device`;
    const customHeaders = {
      Accept: 'application/json',
      'X-REGISTRATION-TOKEN': data.fcm,
      Authorization: `Bearer ${data.accessToken}`,
      'X-API-KEY':
        'LSovK2FzL3BvaWorK35gPS0zMjk0Ki04NQ0KLSo4NSsxKi84c2FhXF1bL1wNCl0=',
    };

    return await axios
      .post(url, {}, {headers: customHeaders})
      .then(response => {
        return response?.data;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };

  removeNotifications = async data => {
    const url = `${MAIN_URL}/users/me/notifications/remove-device`;
    const customHeaders = {
      Authorization: `Bearer ${data.accessToken}`,
      'X-API-KEY':
        'LSovK2FzL3BvaWorK35gPS0zMjk0Ki04NQ0KLSo4NSsxKi84c2FhXF1bL1wNCl0=',
    };

    return await axios
      .put(url, {}, {headers: customHeaders})
      .then(response => {
        return response?.data;
      })
      .catch(err => {
        console.log('checking error : ', err);
        return Promise.reject(err);
      });
  };

  // ** API_ENDPOINT: Users API CALLS
  login = async data => {
    return axios.post(`${MAIN_URL}/users/login`, data);
  };

  register = async data => {
    return axios.post(`${MAIN_URL}/users/register`, data);
  };

  UserMe() {
    return axios.get(`${MAIN_URL}/users/me`);
  }

  deleteAccount() {
    return axios.delete(`${MAIN_URL}/users/me`);
  }
}

import React from 'react';
import {showToast} from './utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NODE_URL =
  'https://n9nujiqsyd.execute-api.us-east-1.amazonaws.com/dev/';

// ** Utils
import {theme as AppTheme} from '../@core/infrustructure/theme';

// ** SVGs
import Home from '../assets/svgs/home.svg';
import HomeActive from '../assets/svgs/homeActive.svg';
import User from '../assets/svgs/user.svg';
import UserActive from '../assets/svgs/user.svg';

export const resizeMode = 'cover';

// ** DONE: Async Storage items has been set
export const getData = async key => {
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

export const setData = async (key, value) => {
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

export const removeData = async key => {
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

export const getAllData = async () => {
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

export const clearAllData = async () => {
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

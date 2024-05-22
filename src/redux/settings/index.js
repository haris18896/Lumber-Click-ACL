// AuthSlice.js
import {createSlice} from '@reduxjs/toolkit';
import useJwt from '../../@core/auth/useJwt';

// ** Function: Reducer
const SettingsSlice = createSlice({
  name: 'settings',
  initialState: {
    theme: 'light',
  },
  reducers: {
    ToggleTheme: async (state, action) => {
      await useJwt.setData(action.payload);
      return {
        ...state,
        theme: action.payload === 'dark' ? 'light' : 'dark',
      };
    },
  },
});

export const {ToggleTheme} = SettingsSlice.actions;

export default SettingsSlice.reducer;

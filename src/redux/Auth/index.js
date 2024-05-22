// AuthSlice.js
import {createSlice} from '@reduxjs/toolkit';
import useJwt from '../../@core/auth/useJwt';
import {createAction} from '../createAction';

// ** Function: Actions
export const LoginAction = createAction('Login', useJwt.login);

export const register = createAction('DeleteAccount', useJwt.register);

export const UserMeAction = createAction('UserMe', useJwt.UserMe);

export const DeleteAccountAction = createAction(
  'DeleteAccount',
  useJwt.deleteAccount,
);

// Initial State
const initialState = {
  login: {},
  userMe: {},
  avatar: null,
  role: null,
  permissions: [],
};

// ** Function: Reducer
const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    Logout: state => {
      return {
        ...state,
        login: {},
        userMe: {},
        isLoading: false,
      };
    },
    UserProfileAction: (state, action) => {
      return {
        ...state,
        avatar: action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder
      // ** STATES: LoginAction
      .addCase(LoginAction.fulfilled, (state, action) => {
        state.login = action.payload;
      })

      // ** STATES: UserMeAction
      .addCase(UserMeAction.fulfilled, (state, action) => {
        state.userMe = action.payload;
      });
  },
});

export const {Logout, UserProfileAction} = AuthSlice.actions;
export default AuthSlice.reducer;

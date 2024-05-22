import {showToast} from '../utils/utils';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const createAction = (type, apiFunction) => {
  return createAsyncThunk(
    `dashboard/${type}`,
    async (
      {data, callback, refreshing, errorCallback},
      {fulfillWithValue, rejectWithValue},
    ) => {
      try {
        const res = await apiFunction(data);
        const result = res?.data?.result;
        refreshing();

        if (res?.data?.success || res?.statusCode === 200) {
          callback(result);
        }

        return fulfillWithValue(result);
      } catch (err) {
        refreshing();
        errorCallback(err);
        showToast({
          title: `Error in ${type}`,
          message: err?.response?.data?.message || err?.message,
          type: 'error',
        });
        return rejectWithValue(err);
      }
    },
  );
};

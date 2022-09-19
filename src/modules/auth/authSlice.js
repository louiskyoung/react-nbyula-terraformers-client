import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../utils/apiService';

const initialState = {
  user: null,
};

export const register = createAsyncThunk('auth/register', async (data) => {
  const response = await apiService.post('/register', data);
  return response.data;
});

export const getUserInfo = createAsyncThunk('auth/getUserInfo', async () => {
  const response = await apiService.get('/getUserInfo');
  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.user = payload;
      localStorage.token = payload.token;
    });
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const { logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => !!state.auth.user;
export const selectIsTerraformer = (state) =>
  state.auth.user && state.auth.user.role === 'terraformer';

export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('api/getUser', async () => {
  const response = await axios.get('/api/user').catch((err) => {
    throw err.response.data;
  });
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
});

export const logoutUser = createAsyncThunk('api/logoutUser', async () => {
  await axios.post('/api/auth/logout').catch((err) => {
    throw err.response.data;
  });
  localStorage.removeItem('user');
});

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoading: true,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = true;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isLoading = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = true;
    });
  },
});

export const { setError, clearError } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProductCategory = createAsyncThunk('api/productCategory', async () => {
  const response = await axios.post('/api/productCategory').catch((err) => {
    throw err.response.data;
  });
  return response.data;
});

const initialState = {
  value: [],
  isLoading: true,
  error: '',
};

export const productCategorySlice = createSlice({
  name: 'productCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductCategory.fulfilled, (state, action) => {
      state.value = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProductCategory.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = true;
    });
  },
});

export default productCategorySlice.reducer;

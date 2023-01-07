import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  value: JSON.parse(localStorage.getItem('shoppingcart')) || [],
  isLoading: true,
  error: '',
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addShoppingCart: (state, action) => {
      state.value = [...state.value, action.payload];
      localStorage.setItem('shoppingcart', JSON.stringify(state.value));
    },
    updateShoppingCart: (state, action) => {
      const index = state.value.findIndex(
        (a) =>
          a.user === action.payload.info.user &&
          a.product === action.payload.info.product &&
          a.productSize === action.payload.filter.size &&
          a.productColor === action.payload.filter.color,
      );
      if (index >= 0) {
        if (
          !state.value.find(
            (a, i) =>
              a.user === action.payload.info.user &&
              a.product === action.payload.info.product &&
              a.productSize === action.payload.info.productSize &&
              a.productColor === action.payload.info.productColor &&
              i !== index
          )
        ) {
          state.value[index] = action.payload.info;
          localStorage.setItem('shoppingcart', JSON.stringify(state.value));
        }
      }
    },
    removeShoppingCart: (state, action) => {
      state.value = state.value.filter(
        (a) =>
          a.user !== action.payload.user ||
          a.product !== action.payload.product ||
          a.productSize !== action.payload.productSize ||
          a.productColor !== action.payload.productColor,
      );
      localStorage.setItem('shoppingcart', JSON.stringify(state.value));
    },
    resetShoppingCart: (state)=>{
      state.value = [];
      localStorage.removeItem("shoppingcart");
    }
  },
  extraReducers: (builder) => {},
});

export const { addShoppingCart, updateShoppingCart, removeShoppingCart, resetShoppingCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/features/auth/authSlice';
import modalReducer from 'src/features/modal/modalSlice';
import productCategoryReducer from 'src/features/productCategory/productCategorySlice';
import shoppingCartReducer from 'src/features/shoppingCart/shoppingCartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    productCategory: productCategoryReducer,
    shoppingCart: shoppingCartReducer,
  },
});

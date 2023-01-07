import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.value = action.payload;
    },
    closeModal: (state) => {
      state.value = null;
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

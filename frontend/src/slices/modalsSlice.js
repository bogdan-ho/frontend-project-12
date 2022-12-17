/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = { isOpened: false, type: null, extra: null };

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setActiveModal: (state, action) => {
      const { modalType, extra = null } = action.payload;

      state.isOpened = true;
      state.type = modalType;
      state.extra = extra;
    },
    hideModal: (state) => {
      state.isOpened = null;
      state.type = null;
      state.extra = null;
    },
  },
});

export const { setActiveModal, hideModal } = modalsSlice.actions;
export default modalsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    visible: false,
    type: null,
    title: null,
  },
  reducers: {
    showModal(state, action) {
      state.visible = true;
      state.type = action.payload.type;
      state.title = action.payload.title;
    },
    hideModal(state) {
      state.visible = false;
      state.type = null;
      state.title = null;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  visible: boolean;
  type: string | null;
  title: string | null;
}

const initialState: IInitialState = {
  visible: false,
  type: null,
  title: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, action) {
      state.visible = action.payload.visible;
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

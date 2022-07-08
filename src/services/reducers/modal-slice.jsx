import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  ingredient: {},
  order: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showIngredientModal(state, action) {
      state.visible = true;
      state.ingredient = action.payload;
    },
    showOrderModal(state, action) {},
    hideModal(state) {
      state = initialState;
    },
  },
});

export const { showIngredientModal, hideModal, showOrderModal } =
  modalSlice.actions;
export default modalSlice.reducer;

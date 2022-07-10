import { createSlice } from "@reduxjs/toolkit";

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: {
    ingredient: null,
  },
  reducers: {
    getIngredient(state, action) {
      state.ingredient = action.payload;
    },
    resetIngredient(state) {
      state.ingredient = {};
    },
  },
});

export const { getIngredient, resetIngredient } = ingredientSlice.actions;
export default ingredientSlice.reducer;

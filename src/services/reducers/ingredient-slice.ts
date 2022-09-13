import { createSlice } from "@reduxjs/toolkit";
import { IIngredient } from "../types/data";

interface IInitialState {
  ingredient: IIngredient[];
}

const initialState: IInitialState = {
  ingredient: [],
};

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    getIngredient(state, action) {
      state.ingredient = action.payload;
    },
    resetIngredient(state) {
      state.ingredient = [];
    },
  },
});

export const { resetIngredient } = ingredientSlice.actions;
export default ingredientSlice.reducer;

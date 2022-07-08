import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  ingredients: [],
  bun: {},
};

const constructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    addIngredient(state, action) {
      if (action.payload.type === "bun") {
        state.bun = { ...action.payload, id: uuid() };
      } else {
        state.ingredients.push({ ...action.payload, id: uuid() });
      }
    },
    removeIngredient(state, action) {
      const index = state.ingredients.indexOf((el) => el.id === action.payload);
      state.ingredients.splice(index, 1);
    },
    reorderIngredients(state, action) {
      const { index, toIndex } = action.payload;
      state.ingredients.splice(
        index,
        0,
        state.ingredients.splice(toIndex, 1)[0]
      );
    },
    resetConstructor(state) {
      state = initialState;
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  resetConstructor,
  reorderIngredients,
} = constructorSlice.actions;
export default constructorSlice.reducer;

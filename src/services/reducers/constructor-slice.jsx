import { createSlice } from "@reduxjs/toolkit";

const constructorSlice = createSlice({
  name: "constructor",
  initialState: {
    ingredients: [],
    bun: {},
    numberOfIngredients: [],
  },
  reducers: {
    addIngredient(state, action) {
      if (action.payload.type === "bun") {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient(state, action) {},
    resetConstructor(state, action) {},
  },
});

export const { addIngredient, removeIngredient, resetConstructor } =
  constructorSlice.actions;
export default constructorSlice.reducer;

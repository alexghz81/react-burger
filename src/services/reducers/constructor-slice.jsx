import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const constructorSlice = createSlice({
  name: "constructor",
  initialState: {
    ingredients: [],
    bun: {},
  },
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
    resetConstructor(state, action) {},
  },
});

export const { addIngredient, removeIngredient, resetConstructor } =
  constructorSlice.actions;
export default constructorSlice.reducer;

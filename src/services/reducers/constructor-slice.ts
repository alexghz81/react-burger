import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { IIngredient } from "../types/data";

export interface IConstructorIngredient extends IIngredient {
  id: string;
}

interface IConstructorInitialState {
  ingredients: IConstructorIngredient[];
  bun: IConstructorIngredient | null;
}

const initialState: IConstructorInitialState = {
  ingredients: [],
  bun: null,
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
    removeIngredient(state, action: PayloadAction<string>) {
      const index: number = state.ingredients.findIndex(
        (el: IConstructorIngredient) => el.id === action.payload
      );
      state.ingredients.splice(index, 1);
    },
    reorderIngredients(state, action) {
      const { index, toIndex }: { index: number; toIndex: number } =
        action.payload;
      state.ingredients.splice(
        index,
        0,
        state.ingredients.splice(toIndex, 1)[0]
      );
    },
    resetConstructor(state) {
      state.ingredients = [];
      state.bun = null;
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

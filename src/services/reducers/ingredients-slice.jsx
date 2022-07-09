import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${API_URL}ingredients`);
      if (!response.ok) {
        throw new Error("Ошибка загрузки ингредиентов с сервера!");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    allIngredients: [],
    isLoading: false,
    hasError: false,
  },
  extraReducers: {
    [fetchIngredients.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchIngredients.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allIngredients = action.payload.data;
    },
    [fetchIngredients.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export default ingredientsSlice.reducer;

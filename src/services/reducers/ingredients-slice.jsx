import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${API_URL}ingredients`);
      return checkResponse(response);
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
    errorMessage: "",
  },
  extraReducers: {
    [fetchIngredients.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
      state.errorMessage = null;
    },
    [fetchIngredients.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allIngredients = action.payload.data;
    },
    [fetchIngredients.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
      state.errorMessage = "Ошибка получения ингредиентов с сервера!";
    },
  },
});

export default ingredientsSlice.reducer;

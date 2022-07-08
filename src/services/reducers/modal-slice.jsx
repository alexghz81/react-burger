import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";

export const fetchOrder = createAsyncThunk(
  "modal/fetchOrder",
  async function (ingredients, { rejectWithValue }) {
    try {
      const response = await fetch(`${API_URL}orders`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredients }),
      });
      if (!response.ok) {
        throw new Error("Ошибка получения номера заказа!");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    visible: false,
    data: {},
    type: null,
    title: null,
    hasError: false,
    pending: false,
  },
  reducers: {
    showIngredientModal(state, action) {
      state.visible = true;
      state.data = action.payload.data;
      state.type = action.payload.type;
      state.title = action.payload.title;
    },
    hideModal(state) {
      state.visible = false;
      state.data = {};
      state.type = null;
      state.title = null;
      state.hasError = false;
      state.pending = false;
    },
  },
  extraReducers: {
    [fetchOrder.pending]: (state) => {
      state.pending = true;
      state.hasError = false;
    },
    [fetchOrder.fulfilled]: (state, action) => {
      state.pending = false;
      state.data = action.payload.order.number;
      state.visible = true;
    },
    [fetchOrder.rejected]: (state) => {
      state.pending = false;
      state.hasError = true;
    },
  },
});

export const { showIngredientModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;

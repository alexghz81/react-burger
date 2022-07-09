import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";

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
      return await checkResponse(response, "Ошибка получения номера заказа!");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    number: null,
    pending: false,
    hasError: false,
  },
  reducers: {
    resetOrder(state) {
      state.number = null;
    },
  },
  extraReducers: {
    [fetchOrder.pending]: (state) => {
      state.pending = true;
      state.hasError = false;
    },
    [fetchOrder.fulfilled]: (state, action) => {
      state.pending = false;
      state.number = action.payload.order.number;
    },
    [fetchOrder.rejected]: (state) => {
      state.pending = false;
      state.hasError = true;
    },
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;

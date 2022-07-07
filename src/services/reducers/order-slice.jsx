import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";

export const orderRequest = createAsyncThunk(
  "order/orderRequest",
  async function (ingredientsArray, { rejectWithValue }) {
    try {
      const response = await fetch(`${API_URL}order`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(ingredientsArray),
      });
      if (!response.ok) {
        throw new Error("Ошибка размещения заказа!");
      }
      return await response.json();
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
    createOrder(state, action) {},
  },
  extraReducers: {
    [orderRequest.pending]: (state) => {
      state.pending = true;
      state.hasError = false;
    },
    [orderRequest.fulfilled]: (state, action) => {
      state.pending = false;
      state.number = action.payload;
    },
    [orderRequest.rejected]: (state) => {
      state.pending = false;
      state.hasError = true;
    },
  },
});

export const { createOrder } = orderSlice.actions;
export default orderSlice.reducer;

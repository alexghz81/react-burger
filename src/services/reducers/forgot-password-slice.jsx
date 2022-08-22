import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";

const initialState = {
  request: false,
  hasError: false,
  errorMessage: null,
  success: false,
  isForgotPassword: false,
};

export const fetchForgotPassword = createAsyncThunk(
  "forgotPassword/fetchForgotPassword",
  async function (form, { rejectWithValue }) {
    try {
      const response = await fetch(`${API_URL}password-reset`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log("Forgot password Response :", response);
      return checkResponse(response);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  extraReducers: {
    [fetchForgotPassword.pending]: (state) => {
      state.request = true;
      state.hasError = false;
      state.errorMessage = null;
      state.isForgotPassword = false;
    },
    [fetchForgotPassword.fulfilled]: (state, action) => {
      state.request = false;
      state.success = action.payload.success;
      state.isForgotPassword = true;
    },
    [fetchForgotPassword.rejected]: (state, action) => {
      state.hasError = true;
      state.errorMessage = action.payload;
    },
  },
});

export default forgotPasswordSlice.reducer;

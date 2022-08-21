import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";

const initialState = {
  request: false,
  hasError: false,
  errorMessage: null,
  success: false,
};

export const fetchResetPassword = createAsyncThunk(
  "resetPassword/fetchResetPassword",
  async function (form, { rejectWithValue }) {
    try {
      console.log("Reset Password form", form);
      const response = await fetch(`${API_URL}password-reset/reset`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log("Reset password Response :", response);
      return checkResponse(response);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  extraReducers: {
    [fetchResetPassword.pending]: (state) => {
      state.request = true;
      state.hasError = false;
      state.errorMessage = null;
      state.success = false;
    },
    [fetchResetPassword.fulfilled]: (state, action) => {
      state.request = false;
      state.success = action.payload.success;
    },
    [fetchResetPassword.rejected]: (state, action) => {
      state.request = false;
      state.hasError = true;
      state.errorMessage = action.payload;
    },
  },
});

export default resetPasswordSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";
import { setCookie } from "../../utils/utils";

const initialState = {
  request: false,
  hasError: false,
  errorMessage: null,
  success: false,
};

export const fetchRegister = createAsyncThunk(
  "register/fetchRegister",
  async function (form, { rejectWithValue }) {
    try {
      const response = await fetch(`${API_URL}auth/register`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      return checkResponse(response);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  extraReducers: {
    [fetchRegister.pending]: (state) => {
      state.request = true;
      state.hasError = false;
      state.errorMessage = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.request = false;
      setCookie("accessToken", action.payload.accessToken.split("Bearer ")[1]);
      setCookie("refreshToken", action.payload.refreshToken);
      state.success = true;
    },
    [fetchRegister.rejected]: (state, action) => {
      state.request = false;
      state.hasError = true;
      state.errorMessage = action.payload;
      console.log(state.errorMessage);
    },
  },
});

export default registerSlice.reducer;

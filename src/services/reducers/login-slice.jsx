import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async function (form, { rejectWithValue }) {
    try {
      const response = await fetch(`${API_URL}auth/login`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log("Login Response :", response);
      return checkResponse(response);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    password: "",
    name: "",
    request: false,
    hasError: false,
    errorMessage: "",
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.request = true;
      state.hasError = false;
      state.errorMessage = null;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.request = false;
      state.auth = action.payload.data;
    },
    [fetchLogin.rejected]: (state) => {
      state.request = false;
      state.hasError = true;
      state.errorMessage = "Ошибка авторизации!";
    },
  },
});

export default loginSlice.reducer;

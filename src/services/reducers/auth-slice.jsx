import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";

const initialState = {
  form: {
    email: "",
    password: "",
    name: "",
  },
  request: false,
  hasError: false,
  errorMessage: "",
  user: {},
  token: "",
};

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async function (form, { rejectWithValue }) {
    try {
      console.log("FORM : ", form);
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
      console.log("Register Response :", response);
      return checkResponse(response);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
      console.log("Register Response :", response);
      return checkResponse(response);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchForgotPassword = createAsyncThunk(
  "auth/fetchForgotPassword",
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    formSetValue(state, action) {
      console.log("ACTION : ", action.payload);
      state.form[action.payload.input] = action.payload.value;
    },
  },
  extraReducers: {
    [fetchRegister.pending]: (state) => {
      state.request = true;
      state.hasError = false;
      state.errorMessage = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.request = false;
      console.log("fetchRegister action", action);
      state.user = action.payload.user;
      state.token = action.payload.accessToken.split("Bearer ")[1];
      state.form = {
        email: "",
        password: "",
        name: "",
      };
      // if (state.token) {
      //   setCookie("token", state.token);
      // }
      console.log("Token :", state.token);
      // state.email = action.payload.user.email;
      // state.name = action.payload.user.name;
    },
    [fetchRegister.rejected]: (state) => {
      state.request = false;
      state.hasError = true;
      state.errorMessage = "Ошибка регистрации!";
    },
    [fetchForgotPassword.pending]: (state) => {
      state.request = true;
      state.hasError = false;
      state.errorMessage = null;
    },
    [fetchForgotPassword.fulfilled]: (state, action) => {
      state.request = false;
      console.log(action.payload.message);
      state.hasError = false;
      state.errorMessage = null;
    },
    [fetchLogin.pending]: (state) => {
      state.request = true;
      state.hasError = false;
      state.errorMessage = null;
    },
  },
});
export const { formSetValue } = authSlice.actions;
export default authSlice.reducer;

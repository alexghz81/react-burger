import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";
import {
  deleteCookie,
  fetchWithRefresh,
  getCookie,
  setCookie,
} from "../../utils/utils";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { string } from "prop-types";

enum MethodEnum {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
}

interface IAuthInitialState {
  email: string;
  name: string;
  password: string;
  request: boolean;
  hasError: boolean;
  errorMessage: string | null;
  isAuthChecked: boolean;
}

const initialState: IAuthInitialState = {
  email: "",
  name: "",
  password: "",
  request: false,
  hasError: false,
  errorMessage: null,
  isAuthChecked: false,
};

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
      return checkResponse(response);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetchWithRefresh(`${API_URL}auth/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUpdateUser = createAsyncThunk(
  "auth/fetchUpdateUser",
  async function (form, { rejectWithValue }) {
    try {
      const response = await fetchWithRefresh(`${API_URL}auth/user`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLogout = createAsyncThunk(
  "auth/fetchLogout",
  async function (refreshToken: string, { rejectWithValue }) {
    try {
      const response = await fetch(`${API_URL}auth/logout`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
      });
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
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
    setAuthPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.request = true;
      state.hasError = false;
      state.errorMessage = null;
    }),
      builder.addCase(fetchLogin.fulfilled, (state, action) => {
        state.request = false;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.isAuthChecked = true;
        setCookie(
          "accessToken",
          action.payload.accessToken.split("Bearer ")[1]
        );
        setCookie("refreshToken", action.payload.refreshToken);
      }),
      builder.addCase(fetchLogin.rejected, (state) => {
        state.request = false;
        state.hasError = true;
        state.errorMessage = "Ошибка авторизации!";
      }),
      builder.addCase(fetchUser.pending, (state) => {
        state.request = true;
        state.hasError = false;
        state.errorMessage = null;
      }),
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.request = false;
        state.isAuthChecked = action.payload.success;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
      }),
      // builder.addCase(fetchUser.rejected, (state, action) => {
      //   state.request = false;
      //   state.hasError = true;
      //   state.errorMessage = action.payload;
      // }),
      builder.addCase(fetchLogout.pending, (state) => {
        state.request = true;
        state.hasError = false;
        state.errorMessage = null;
      }),
      builder.addCase(fetchLogout.fulfilled, (state) => {
        state.request = false;
        state.name = "";
        state.email = "";
        state.isAuthChecked = false;
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      }),
      // builder.addCase(fetchLogout.rejected, (state, action) => {
      //   state.request = false;
      //   state.hasError = true;
      //   state.errorMessage = action.payload;
      // }),
      builder.addCase(fetchUpdateUser.pending, (state) => {
        state.request = true;
        state.hasError = false;
        state.errorMessage = null;
      }),
      builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.request = false;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
      });
    // builder.addCase(fetchUpdateUser.rejected, (state, action) => {
    //   state.request = false;
    //   state.hasError = true;
    //   if (typeof action.payload.message === "string") {
    //     state.errorMessage = action.payload.message;
    //   }
    // });
  },
});

export const { setAuthPassword } = authSlice.actions;
export default authSlice.reducer;

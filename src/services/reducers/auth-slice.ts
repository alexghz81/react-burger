import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";
import {
  deleteCookie,
  fetchWithRefresh,
  getCookie,
  setCookie,
} from "../../utils/utils";

type TFetchLogoutResponse = {
  success: string;
  message: string;
};

interface TFetchUserResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
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

type TFetchLoginForm = {
  email: string;
  password: string;
};

export const fetchLogin = createAsyncThunk<
  TFetchUserResponse,
  TFetchLoginForm,
  { rejectValue: string }
>("auth/fetchLogin", async function (form, { rejectWithValue }) {
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
});

export const fetchUser = createAsyncThunk<
  TFetchUserResponse,
  undefined,
  { rejectValue: string }
>("auth/fetchUser", async function (_, { rejectWithValue }) {
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
});

interface IFetchUpdateUserForm {
  name: string;
  email: string;
  password: string;
}

export const fetchUpdateUser = createAsyncThunk<
  TFetchUserResponse,
  IFetchUpdateUserForm,
  { rejectValue: string }
>("auth/fetchUpdateUser", async function (form, { rejectWithValue }) {
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
});

export const fetchLogout = createAsyncThunk<
  TFetchLogoutResponse,
  void,
  { rejectValue: string }
>("auth/fetchLogout", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch(`${API_URL}auth/logout`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    });
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    return checkResponse(response);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.request = true;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.request = false;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.isAuthChecked = true;
        setCookie(
          "accessToken",
          action.payload.accessToken.split("Bearer ")[1]
        );
        setCookie("refreshToken", action.payload.refreshToken);
      })
      .addCase(fetchUser.pending, (state) => {
        state.request = true;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.request = false;
        state.isAuthChecked = action.payload.success;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.request = true;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.request = false;
        state.name = "";
        state.email = "";
        state.isAuthChecked = false;
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.request = true;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.request = false;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.hasError = true;
        state.errorMessage = action.payload;
        state.request = false;
      });
  },
});

export const { setAuthPassword } = authSlice.actions;
export default authSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

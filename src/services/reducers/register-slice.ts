import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";
import { setCookie } from "../../utils/utils";

const initialState = {
  request: false,
  hasError: false,
  errorMessage: null,
  success: false,
};

interface IFetchRegisterForm {
  email: string;
  password: string;
  name: string;
}

interface IFetchRegisterResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

export const fetchRegister = createAsyncThunk<
  IFetchRegisterResponse,
  IFetchRegisterForm,
  { rejectValue: string }
>("register/fetchRegister", async function (form, { rejectWithValue }) {
  try {
    console.log(form);
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
});

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.request = true;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.request = false;
        setCookie(
          "accessToken",
          action.payload.accessToken.split("Bearer ")[1]
        );
        setCookie("refreshToken", action.payload.refreshToken);
        state.success = true;
      })
      .addMatcher(isError, (state, action) => {
        state.request = false;
        state.hasError = true;
        state.errorMessage = action.payload;
        console.log(state.errorMessage);
      });
  },
});

export default registerSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

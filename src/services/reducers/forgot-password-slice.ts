import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";

const initialState = {
  request: false,
  hasError: false,
  errorMessage: null,
  success: false,
  isForgotPassword: false,
};

type TfetchForgotPasswordResponse = {
  success: boolean;
  message: string;
};

type TForm = {
  email: string;
};

export const fetchForgotPassword = createAsyncThunk<
  TfetchForgotPasswordResponse,
  TForm,
  { rejectValue: string }
>(
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForgotPassword.pending, (state) => {
        state.request = true;
        state.hasError = false;
        state.errorMessage = null;
        state.isForgotPassword = false;
      })
      .addCase(fetchForgotPassword.fulfilled, (state, action) => {
        state.request = false;
        state.success = action.payload.success;
        state.isForgotPassword = true;
      })
      .addMatcher(isError, (state, action) => {
        state.hasError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default forgotPasswordSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

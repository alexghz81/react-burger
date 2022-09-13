import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";

interface IInitialState {
  request: boolean;
  success: boolean;
  errorMessage: string | null;
  hasError: boolean;
}

const initialState: IInitialState = {
  request: false,
  hasError: false,
  errorMessage: null,
  success: false,
};

interface IFetchResetPasswordResponse {
  success: boolean;
  message: string;
}

interface IFetchResetPasswordForm {
  password: string;
  token: string;
}

export const fetchResetPassword = createAsyncThunk<
  IFetchResetPasswordResponse,
  IFetchResetPasswordForm,
  { rejectValue: string }
>(
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResetPassword.pending, (state) => {
        state.request = true;
        state.hasError = false;
        state.errorMessage = null;
        state.success = false;
      })
      .addCase(fetchResetPassword.fulfilled, (state, action) => {
        state.request = false;
        state.success = action.payload.success;
      })
      .addMatcher(isError, (state, action) => {
        state.request = false;
        state.hasError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default resetPasswordSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

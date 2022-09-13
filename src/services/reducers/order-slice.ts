import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";
import { getCookie } from "../../utils/utils";

type TRes = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export const fetchOrder = createAsyncThunk<
  TRes,
  string[],
  { rejectValue: string }
>("modal/fetchOrder", async function (ingredients, { rejectWithValue }) {
  try {
    const response = await fetch(`${API_URL}orders`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({ ingredients: ingredients }),
    });
    return checkResponse(response);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

interface IOrderInitialState {
  number: number | null;
  pending: boolean;
  hasError: boolean;
  errorMessage: string | null;
}

const initialState: IOrderInitialState = {
  number: null,
  pending: false,
  hasError: false,
  errorMessage: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder(state) {
      state.number = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.pending = true;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.pending = false;
        state.number = action.payload.order.number;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.errorMessage = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

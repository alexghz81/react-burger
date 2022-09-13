import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";
import checkResponse from "../../utils/check-response";
import { IIngredient } from "../types/data";

type TRes = {
  success: boolean;
  data: IIngredient[];
};

export const fetchIngredients = createAsyncThunk<
  TRes,
  undefined,
  { rejectValue: string }
>("ingredients/fetchIngredients", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch(`${API_URL}ingredients`);
    return await checkResponse(response);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

interface IIngredientsInitialState {
  allIngredients: TRes;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
}

const initialState: IIngredientsInitialState = {
  allIngredients: { success: false, data: [] },
  isLoading: false,
  hasError: false,
  errorMessage: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.allIngredients.data = payload.data;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
      });
  },
});

export default ingredientsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

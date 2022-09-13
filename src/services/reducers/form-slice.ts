import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  [key: string]: string;
}

const initialState: IInitialState = {
  email: "",
  password: "",
  name: "",
  token: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    formSetValue(
      state,
      action: PayloadAction<{ input: string; value: string }>
    ) {
      state[action.payload.input] = action.payload.value;
    },
  },
});
export const { formSetValue } = formSlice.actions;
export default formSlice.reducer;

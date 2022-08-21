import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  name: "",
  token: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    formSetValue(state, action) {
      state[action.payload.input] = action.payload.value;
    },
  },
});
export const { formSetValue } = formSlice.actions;
export default formSlice.reducer;

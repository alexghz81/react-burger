import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";

const initialState = {
  wsConnected: false,
  wsMessages: [],
  wsError: null,
  wsConnecting: false,
  wsAuthConnected: false,
  wsAuthMessage: [],
  wsAuthError: null,
  wsSendMessage: null,
};

const wsSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {
    wsConnectionStart(state) {
      state.wsConnecting = true;
      state.wsError = false;
      state.wsConnected = false;
      state.wsMessages = [];
    },
    wsConnectionSuccess(state) {
      state.wsConnected = true;
      state.wsConnecting = false;
    },
    wsConnectionError(state, action) {
      state.wsError = action.payload;
      state.wsConnected = false;
    },
    wsConnectionClosed(state) {
      state.wsConnected = false;
    },
    wsGetMessage(state, action) {
      state.wsMessages = action.payload;
    },
    wsSendMessage(state, action) {
      state.wsSendMessage = action.payload;
    },
  },
});

export const {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage,
  wsSendMessage,
} = wsSlice.actions;
export default wsSlice.reducer;

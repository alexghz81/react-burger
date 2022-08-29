import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";

const initialState = {
  wsConnected: false,
  wsMessages: [],
  wsError: null,
  wsConnecting: false,
  wsAuthConnecting: false,
  wsAuthConnected: false,
  wsAuthMessages: [],
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
    wsAuthConnectionSuccess(state) {
      state.wsAuthConnected = true;
      state.wsConnecting = false;
    },
    wsGetAuthMessages(state, action) {
      state.wsAuthMessages = action.payload;
    },
    wsAuthConnectionClosed(state) {
      state.wsAuthConnected = false;
    },
    wsAuthConnectionStart(state) {
      state.wsAuthConnecting = true;
      state.wsError = false;
      state.wsAuthConnected = false;
      state.wsAuthMessages = [];
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
  wsAuthConnectionSuccess,
  wsGetAuthMessages,
  wsAuthConnectionClosed,
  wsAuthConnectionStart,
} = wsSlice.actions;
export default wsSlice.reducer;

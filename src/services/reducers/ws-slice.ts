import { createSlice } from "@reduxjs/toolkit";
import { IOrder } from "../types/data";

type IWsOrdersResponse = {
  success: string;
  orders: IOrder[];
  total: number;
  totalToday: number;
};

interface IInitialState {
  wsConnected: boolean;
  wsMessages: IWsOrdersResponse;
  wsError: boolean;
  wsConnecting: boolean;
  wsAuthConnecting: boolean;
  wsAuthConnected: boolean;
  wsAuthMessages: IWsOrdersResponse;
  wsAuthError: boolean;
  wsSendMessage: string | null;
}

const initialState: IInitialState = {
  wsConnected: false,
  wsMessages: {
    success: "",
    orders: [],
    total: 0,
    totalToday: 0,
  },
  wsError: false,
  wsConnecting: false,
  wsAuthConnecting: false,
  wsAuthConnected: false,
  wsAuthMessages: {
    success: "",
    orders: [],
    total: 0,
    totalToday: 0,
  },
  wsAuthError: false,
  wsSendMessage: null,
};

const wsSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {
    wsConnectionStart(state, action) {
      state.wsConnecting = true;
      state.wsError = false;
      state.wsConnected = false;
      state.wsMessages = {
        success: "",
        orders: [],
        total: 0,
        totalToday: 0,
      };
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
      state.wsAuthConnecting = false;
    },
    wsGetAuthMessages(state, action) {
      state.wsMessages = action.payload;
    },
    wsAuthConnectionClosed(state) {
      state.wsAuthConnected = false;
    },
    wsAuthConnectionStart(state, action) {
      state.wsAuthConnecting = true;
      state.wsError = false;
      state.wsAuthConnected = false;
      state.wsAuthMessages = {
        success: "",
        orders: [],
        total: 0,
        totalToday: 0,
      };
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

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/ingredients-slice";
import constructorReducer from "./reducers/constructor-slice";
import orderReducer from "./reducers/order-slice";
import tabReducer from "./reducers/tab-slice";
import modalReducer from "./reducers/modal-slice";
import ingredientReducer from "./reducers/ingredient-slice";
import formReducer from "./reducers/form-slice";
import loginReducer from "./reducers/auth-slice";
import forgotPasswordReducer from "./reducers/forgot-password-slice";
import resetPasswordReducer from "./reducers/reset-password-slice";
import registerReducer from "./reducers/register-slice";
import wsReducer from "./reducers/ws-slice";
import {
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
} from "./reducers/ws-slice";
import { socketMiddleware } from "./socketMiddleware";
import { buildThunks as ReturnType } from "@reduxjs/toolkit/src/query/core/buildThunks";
import { Reducer } from "redux";
import logger from "redux-logger";

const wsActions = {
  onStart: wsConnectionStart,
  onOpen: wsConnectionSuccess,
  onClose: wsConnectionClosed,
  onError: wsConnectionError,
  onMessage: wsGetMessage,
  onSendMessage: wsSendMessage,
};

const wsAuthActions = {
  onStart: wsAuthConnectionStart,
  onOpen: wsAuthConnectionSuccess,
  onClose: wsAuthConnectionClosed,
  onError: wsConnectionError,
  onMessage: wsGetAuthMessages,
  onSendMessage: wsSendMessage,
};

const reducers = {
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  tab: tabReducer,
  modal: modalReducer,
  ingredient: ingredientReducer,
  form: formReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  auth: loginReducer,
  register: registerReducer,
  ws: wsReducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<RootState> = (state, action) => {
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(socketMiddleware(wsActions))
      .concat(socketMiddleware(wsAuthActions)),
  // .concat(logger),
});

export default store;

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;

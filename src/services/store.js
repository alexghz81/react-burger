import { configureStore } from "@reduxjs/toolkit";
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
import wsReducer, {wsSendMessage} from "./reducers/ws-slice";
import {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage,
  // wsAuthConnectionSuccess,
  // wsAuthConnectionError,
  // wsAuthConnectionClosed,
  // wsGetAuthMessage,
} from "./reducers/ws-slice";
import { socketMiddleware } from "./socketMiddleware";

const wsActions = {
  onStart: wsConnectionStart,
  onOpen: wsConnectionSuccess,
  onClose: wsConnectionClosed,
  onError: wsConnectionError,
  onMessage: wsGetMessage,
  onSendMessage: wsSendMessage
  // onAuthOpen: wsAuthConnectionSuccess,
  // onAuthError: wsAuthConnectionError,
  // onAuthClose: wsAuthConnectionClosed,
  // onAuthMessage: wsGetAuthMessage,
};

export default configureStore({
  reducer: {
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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      socketMiddleware(wsActions)
    ),
});

import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetMessage,
} from "./reducers/ws-slice";
import { useDispatch, useSelector } from "react-redux";

export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;
    return (next) => (action) => {
      const { dispatch } = store;
      const { onStart, onSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;
      const { type, payload } = action;
      if (type === onStart.toString()) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        socket.onopen = (event) => {
          // dispatch({ type: onOpen, payload: event });
          dispatch(wsConnectionSuccess(event));
        };

        socket.onerror = (event) => {
          dispatch(wsConnectionError(event));
          // dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          // dispatch({ type: onMessage, payload: { ...JSON.parse(data) } });
          dispatch(wsGetMessage({ ...JSON.parse(data) }));
        };

        socket.onclose = (event) => {
          // dispatch({ type: onClose, payload: event });
          dispatch(wsConnectionClosed(event));
          socket.close();
        };

        if (type === onSendMessage.toString()) {
          socket.send(JSON.stringify({ ...payload }));
        }
      }
      next(action);
    };
  };
};

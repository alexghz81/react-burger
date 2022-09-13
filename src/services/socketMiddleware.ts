import { IWsActions } from "./types/data";
import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "./store";

export const socketMiddleware = (wsActions: IWsActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return (next) => (action) => {
      const { dispatch } = store;
      const { onStart, onSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;
      const { type, payload } = action;

      if (type === onStart.toString()) {
        socket = new WebSocket(payload);
      }

      if (type === onClose.toString()) {
        socket && socket.close();
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(onOpen(event));
        };

        socket.onerror = (event) => {
          dispatch(onError(event));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch(onMessage({ ...JSON.parse(data) }));
        };

        socket.onclose = (event) => {
          if (socket) {
            dispatch(onClose(event));
            socket.close();
          }
        };

        if (type === onSendMessage.toString()) {
          socket.send(JSON.stringify({ ...payload }));
        }
      }
      next(action);
    };
  };
};

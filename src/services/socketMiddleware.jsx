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
          dispatch(onClose(event));
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

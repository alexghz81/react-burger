type TOrderStatus = {
  [key: string]: { type: string; text: string };
};

const OrderStatus: TOrderStatus = {
  done: { type: "done", text: "Выполнен" },
  pending: { type: "pending", text: "Готовится" },
  canceled: { type: "canceled", text: "Отменен" },
};

export default OrderStatus;

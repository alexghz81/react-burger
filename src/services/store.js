import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/ingredients-slice";
import constructorReducer from "./reducers/constructor-slice";
import orderReducer from "./reducers/order-slice";

export default configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
  },
});
import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/ingredients-slice";
import constructorReducer from "./reducers/constructor-slice";
import orderReducer from "./reducers/order-slice";
import tabReducer from "./reducers/tab-slice";
import modalReducer from "./reducers/modal-slice";
import ingredientReducer from "./reducers/ingredient-slice";

export default configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    tab: tabReducer,
    modal: modalReducer,
    ingredient: ingredientReducer,
  },
});

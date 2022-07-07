import { combineReducers } from "redux";
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  RESET_INGREDIENTS,
  REORDER_INGREDIENTS,
} from "../actions/constructor-actions";

import {
  INGREDIENTS_LOADING,
  INGREDIENTS_SUCCESS,
  INGREDIENTS_ERROR,
} from "../actions/ingredients-actions";

const constructorInitialState = {
  selectedIngredients: [],
  bunType: "",
};

const ingredientsInitialState = {
  allIngredients: [],
  isLoading: false,
  hasError: false,
};

const ingredientInitialState = {
  currentIngredient: {},
};

const orderInitialState = {
  currentOrder: {},
  isLoading: false,
  hasError: false,
};

const burgerConstructor = (state = constructorInitialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case REMOVE_INGREDIENT: {
      const newState = state.ingredients.filter(
        (el) => el === action.payload._id
      );
      return {
        ...state,
        ingredients: newState,
      };
    }
    case RESET_INGREDIENTS:
      return {
        ...state,
        ingredients: [],
      };
    default:
      return state;
  }
};

const ingredients = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case "INGREDIENTS_LOADING": {
      return { ...state, isLoading: true, hasError: false };
    }
    case "INGREDIENTS_SUCCESS": {
      return { ...state, allIngredients: action.payload, isLoading: false };
    }
    case "INGREDIENTS_ERROR": {
      return { ...state, isLoading: false, hasError: true };
    }
    default:
      return state;
  }
};

const ingredient = (state = ingredientInitialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const order = (state = orderInitialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  burgerConstructor,
  ingredients,
  ingredient,
  order,
});

export default rootReducer;

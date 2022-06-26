import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  RESET_INGREDIENTS,
} from "../actions/ingredients-actions";

export default function ingredientsReducer(state, action) {
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
      throw new Error("Wrong action");
  }
}

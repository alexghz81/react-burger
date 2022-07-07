const INGREDIENTS_LOADING = "INGREDIENTS_LOADING";
const INGREDIENTS_SUCCESS = "INGREDIENTS_SUCCESS";
const INGREDIENTS_ERROR = "INGREDIENTS_ERROR";
const API_URL = "https://norma.nomoreparties.space/api/";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject("Ошибка : " + res);
};

function getIngredients() {
  return function (dispatch) {
    dispatch({ type: INGREDIENTS_LOADING });
    fetch(`${API_URL}ingredients`)
      .then((res) => checkResponse(res))
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: INGREDIENTS_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: INGREDIENTS_ERROR,
          });
        }
      })
      .catch((err) =>
        dispatch({
          type: INGREDIENTS_ERROR,
        })
      );
  };
}

export {
  INGREDIENTS_LOADING,
  INGREDIENTS_SUCCESS,
  INGREDIENTS_ERROR,
  getIngredients,
};

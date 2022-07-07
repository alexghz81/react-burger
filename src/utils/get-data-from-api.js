const API_URL = "https://norma.nomoreparties.space/api/";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject("Ошибка : " + res);
};

export async function getDataFromApi() {
  return await fetch(`${API_URL}ingredients`).then((res) => checkResponse(res));
}

export async function getOrderNumber(data) {
  const ingredientsArray = [];
  data.forEach((el) => {
    ingredientsArray.push(el._id);
  });
  return await fetch(`${API_URL}orders`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ ingredients: ingredientsArray }),
  })
    .then((res) => checkResponse(res))
    .then((res) => {
      return res.order.number;
    })
    .catch((err) => console.log(err));
}

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

const checkResponce = (res) => {
  return res.ok ? res.json() : Promise.reject("Ошибка : " + res);
};

export default async function getDataFromApi() {
  return await fetch(API_URL).then((res) => checkResponce(res));
}

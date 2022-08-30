import { API_URL } from "./constants";
import checkResponse from "./check-response";

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props = {}) {
  props = {
    path: "/",
    ...props,
  };
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

export const refreshToken = () => {
  return fetch(`${API_URL}auth/token`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  }).then((res) => {
    return checkResponse(res);
  });
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    const data = await checkResponse(res);
    return data;
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setCookie("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken.split("Bearer ")[1]);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, {
        ...options,
        headers: {
          authorization: refreshData.accessToken,
        },
      });
      const data = await checkResponse(res);
      return data;
    } else {
      return Promise.reject(err);
    }
  }
};

export const sortIngredients = (ingredients) => {
  return ingredients.sort((a) => (a.type === "bun" ? -1 : 1));
};

export const divideOrdersArray = (ordersArray, callback) => {
  let allOrders = [];
  for (let j = 0; j < ordersArray.length; j += 10) {
    let ordersColumn = [];
    ordersColumn = ordersArray.slice(j, j + 10);
    const ordersNumbersColumn = ordersColumn.map((item) => item.number);
    allOrders.push(ordersNumbersColumn);
  }
  callback(allOrders);
};

export const getOrderByNumber = (number) => {
  return fetch(`${API_URL}/orders/${number}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

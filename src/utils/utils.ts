import { API_URL } from "./constants";
import checkResponse from "./check-response";
import { IIngredient, IOrder, TSetCookieProps } from "../services/types/data";

type TRefreshDataResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
  name: string,
  value: string | boolean | number,
  props?: TSetCookieProps & {
    [extraAttribute: string]: string | number | boolean | undefined;
  }
) {
  props = {
    path: "/",
    ...props,
  };

  let exp = props.expires;
  const d = new Date();

  if (typeof exp === "number" && exp) {
    d.setTime(d.getTime() + exp * 1000);
    Number(d);
    props.expires = exp;
  }
  if (exp && d.toUTCString) {
    props.expires = d.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue: string | number | boolean | undefined = props[propName];
    if (!propValue) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, false, { expires: -1 });
}

export const refreshToken = (): Promise<Response> => {
  return fetch(`${API_URL}auth/token`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  }).then((res) => {
    return res;
  });
};

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res: Response = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData: TRefreshDataResponse = await checkResponse(
        await refreshToken()
      );
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
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const sortIngredients = (ingredients: IIngredient[]) => {
  return ingredients.sort((a) => (a.type === "bun" ? -1 : 1));
};

export const divideOrdersArray = (
  ordersArray: IOrder[],
  callback: Function
) => {
  let allOrders: number[][] = [];
  for (let j = 0; j < ordersArray.length; j += 10) {
    let ordersColumn: IOrder[] = [];
    ordersColumn = ordersArray.slice(j, j + 10);
    const ordersNumbersColumn = ordersColumn.map((item) => item.number);
    allOrders.push(ordersNumbersColumn);
  }
  callback(allOrders);
};

// export const getOrderByNumber = (number) => {
//   return fetch(`${API_URL}/orders/${number}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then(checkResponse);
// };

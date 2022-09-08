export type TIngredientType = "bun" | "sauce" | "main";

export interface IIngredient {
  key?: string;
  type: TIngredientType;
  _id: string;
  name: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IOrder {}

export interface IFetchOptions {
  method: string;
  headers: {
    Authorization: string;
    [n: string]: string;
  };
  body?: string;
}

export interface IWsActions {
  onStart: Function;
  onSendMessage: Function;
  onOpen: Function;
  onClose: Function;
  onError: Function;
  onMessage: Function;
}

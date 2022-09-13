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

export interface IOrder {
  ingredients: string[];
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWsActions {
  onStart: Function;
  onSendMessage: Function;
  onOpen: Function;
  onClose: Function;
  onError: Function;
  onMessage: Function;
}

export type TSetCookieProps = {
  path?: string;
  expires?: string | number;
};

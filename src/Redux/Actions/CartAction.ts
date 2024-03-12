import axios from "axios";
import * as actiontype from "../Constants/CartConstant";
import { URL } from "../../Utils/common-utils";

interface MobileData {
  id: number;
  img: string;
  category: string;
  name: string;
  prevPrice: number;
  price: number;
  discount: string;
  details: string[];
}

interface ProductData {
  id: number;
  url: string;
  title: any;
  price: {
    mrp: number;
    cost: number;
    discount: string;
  };
  description: string;
  quantity: number;
}

interface AddToCartRequestAction {
  type: typeof actiontype.ADD_TO_CART_REQUEST;
}

interface AddToCartAction {
  type: typeof actiontype.ADD_TO_CART;
  payload: ProductData;
}

interface AddToCartErrorAction {
  type: typeof actiontype.ADD_TO_CART_ERROR;
  payload: string;
}

interface IncOneAction {
  type: typeof actiontype.INC_ONE;
  payload: number;
}

interface DecOneAction {
  type: typeof actiontype.DEC_ONE;
  payload: number;
}

interface RemoveFromCartAction {
  type: typeof actiontype.REMOVE_FROM_CART;
  payload: number;
}

type CartAction =
  | AddToCartRequestAction
  | AddToCartAction
  | AddToCartErrorAction
  | IncOneAction
  | DecOneAction
  | RemoveFromCartAction;

export const addToCart = (
  id: number,
  quantity: number,
  type: "mobile" | "product"
) => async (dispatch: (action: CartAction) => void) => {
  try {
    dispatch({ type: actiontype.ADD_TO_CART_REQUEST });

    if (type === "mobile") {
      const { data } = await axios.get<MobileData>(`${URL}/mobile/${id}`);

      const data1: ProductData = {
        id: data.id,
        url: data.img,
        title: { shortTitle: data.category, longTitle: data.name },
        price: {
          mrp: data.prevPrice,
          cost: data.price,
          discount: `${data.discount}%`,
        },
        description: data.details.join(","),
        quantity,
      };

      dispatch({ type: actiontype.ADD_TO_CART, payload: data1 });
    }
    if (type === "product") {
      const { data } = await axios.get<ProductData>(`${URL}/product/${id}`);
      dispatch({ type: actiontype.ADD_TO_CART, payload: { ...data, quantity } });
    }
  } catch (error:any) {
    dispatch({ type: actiontype.ADD_TO_CART_ERROR, payload: error.message });
  }
};

export const incOne = (id: number) => (dispatch: (action: IncOneAction) => void) => {
  dispatch({ type: actiontype.INC_ONE, payload: id });
};

export const decOne = (id: number) => (dispatch: (action: DecOneAction) => void) => {
  dispatch({ type: actiontype.DEC_ONE, payload: id });
};

export const removeFromCart = (id: number) => (dispatch: (action: RemoveFromCartAction) => void) => {
  console.log(id, "in remove action");
  dispatch({ type: actiontype.REMOVE_FROM_CART, payload: id });
};
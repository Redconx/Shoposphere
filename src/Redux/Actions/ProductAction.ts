import axios from "axios";
import * as actionTypes from "../Constants/ProductConstant";
import { URL } from "../../Utils/common-utils";

interface Product {
  // Define the properties of a Product object
}

interface GetProductRequestAction {
  type: typeof actionTypes.GET_PRODUCT_REQUEST;
}

interface GetProductsSuccessAction {
  type: typeof actionTypes.GET_PRODUCTS_SUCCESS;
  payload: Product[];
}

interface GetProductsFailAction {
  type: typeof actionTypes.GET_PRODUCTS_FAIL;
  payload: string;
}

interface GetProductDetailsRequestAction {
  type: typeof actionTypes.GET_PRODUCT_DETAILS_REQUEST;
}

interface GetProductDetailsSuccessAction {
  type: typeof actionTypes.GET_PRODUCT_DETAILS_SUCCESS;
  payload: Product;
}

interface GetProductDetailsFailAction {
  type: typeof actionTypes.GET_PRODUCT_DETAILS_FAIL;
  payload: string;
}

export type ProductAction =
  | GetProductRequestAction
  | GetProductsSuccessAction
  | GetProductsFailAction
  | GetProductDetailsRequestAction
  | GetProductDetailsSuccessAction
  | GetProductDetailsFailAction;

export const getProducts = () => async (dispatch: (action: ProductAction) => void) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_REQUEST });
    const { data } = await axios.get<Product[]>(`${URL}/getProducts`);
    dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error:any) {
    dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.message });
  }
};

export const getProductDetails = (id: number) => async (dispatch: (action: ProductAction) => void) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get<Product>(`${URL}/product/${id}`);
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error:any) {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload: error.message,
    });
  }
};
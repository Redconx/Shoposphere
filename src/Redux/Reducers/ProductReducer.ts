import * as actionType from "../Constants/ProductConstant";

interface Product {
  // Define the properties of a Product object
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error?: any;
}

const initialProductsState: ProductsState = {
  products: [],
  loading: false,
};

export const getProductsReducer = (
  state = initialProductsState,
  action: any
): ProductsState => {
  switch (action.type) {
    case actionType.GET_PRODUCT_REQUEST:
      return { loading: true, products: [] };
    case actionType.GET_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case actionType.GET_PRODUCTS_FAIL:
      return { loading: false, error: action.payload, products: [] };
    default:
      return state;
  }
};

export interface ProductDetailsState {
  product?: Product | {};
  loading: boolean;
}

const initialProductDetailsState: ProductDetailsState = {
  product: {},
  loading: false,
};

export const getProductDetailsReducer = (
  state = initialProductDetailsState,
  action: any
): ProductDetailsState => {
  switch (action.type) {
    case actionType.GET_PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case actionType.GET_PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case actionType.GET_PRODUCT_DETAILS_FAIL:
      return { loading: false, product: action.payload };
    case actionType.GET_PRODUCT_DETAILS_RESET:
      return { product: {}, loading: false };
    default:
      return state;
  }
};
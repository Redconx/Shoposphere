import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ThunkMiddleware from "redux-thunk";
import {
  getProductsReducer,
  getProductDetailsReducer,
  ProductsState,
  ProductDetailsState,
} from "./Reducers/ProductReducer";
import { cartReducer, CartState } from "./Reducers/CartReducer";
import {
  getMobilesReducer,
  getMobileDetailsReducer,
  MobilesState,
  MobileDetailsState,
} from "./Reducers/MobileReducer";
import { getPincodesReducer, PincodesState } from "./Reducers/PinCodesReducer";

export interface RootState {
  getProductDetails: ProductDetailsState;
  getProducts: ProductsState;
  cart: CartState;
  getMobiles: MobilesState;
  getMobileDetails: MobileDetailsState;
  getPincodes: PincodesState;
}

const reducer = combineReducers<RootState>({
  getProductDetails: getProductDetailsReducer,
  getProducts: getProductsReducer,
  cart: cartReducer,
  getMobiles: getMobilesReducer,
  getMobileDetails: getMobileDetailsReducer,
  getPincodes: getPincodesReducer,
});

const middleware = [ThunkMiddleware];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export type AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>
export default store;
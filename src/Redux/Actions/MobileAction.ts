import axios from "axios";
import * as actionTypes from "../Constants/MobileConstant";
import { URL } from "../../Utils/common-utils";

interface GetMobileRequestAction {
  type: typeof actionTypes.GET_MOBILE_REQUEST;
}

interface GetMobileSuccessAction {
  type: typeof actionTypes.GET_MOBILE_SUCCESS;
  payload: any; // Replace 'any' with the appropriate type for the mobile data
}

interface GetMobileFailAction {
  type: typeof actionTypes.GET_MOBILE_FAIL;
  payload: any;
}

interface GetMobileDetailsRequestAction {
  type: typeof actionTypes.GET_MOBILE_DETAILS_REQUEST;
}

interface GetMobileDetailsSuccessAction {
  type: typeof actionTypes.GET_MOBILE_DETAILS_SUCCESS;
  payload: any; // Replace 'any' with the appropriate type for the mobile details data
}

interface GetMobileDetailsFailAction {
  type: typeof actionTypes.GET_MOBILE_DETAILS_FAIL;
  payload: any;
}

export type MobileAction =
  | GetMobileRequestAction
  | GetMobileSuccessAction
  | GetMobileFailAction
  | GetMobileDetailsRequestAction
  | GetMobileDetailsSuccessAction
  | GetMobileDetailsFailAction;

export const getMobiles = (searchStr: string) => async (dispatch: (action: MobileAction) => void) => {
  try {
    dispatch({ type: actionTypes.GET_MOBILE_REQUEST });
    const { data } = await axios.get(`${URL}/getMobiles?${searchStr}`);
    dispatch({ type: actionTypes.GET_MOBILE_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({ type: actionTypes.GET_MOBILE_FAIL, payload: error.message });
  }
};

export const getMobileDetails = (id: string | number) => async (dispatch: (action: MobileAction) => void) => {
  try {
    dispatch({ type: actionTypes.GET_MOBILE_DETAILS_REQUEST });
    const { data } = await axios.get(`${URL}/mobile/${id}`);
    dispatch({ type: actionTypes.GET_MOBILE_DETAILS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: actionTypes.GET_MOBILE_DETAILS_FAIL,
      payload: error.message,
    });
  }
};
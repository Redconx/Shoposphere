import axios from "axios";
import * as actionTypes from "../Constants/PinCodeConstant";
import { URL } from "../../Utils/common-utils";

interface Pincode {
  // Define the properties of a Pincode object
}

interface GetPincodesSuccessAction {
  type: typeof actionTypes.GET_PINCODES_SUCCESS;
  payload: Pincode[];
}

interface GetPincodesFailAction {
  type: typeof actionTypes.GET_PINCODES_FAIL;
  payload: string;
}

type PincodeAction = GetPincodesSuccessAction | GetPincodesFailAction;

export const getPincodes = () => async (dispatch: (action: PincodeAction) => void) => {
  try {
    const { data } = await axios.get<Pincode[]>(`${URL}/getPincodes`);
    dispatch({ type: actionTypes.GET_PINCODES_SUCCESS, payload: data });
  } catch (error:any) {
    dispatch({ type: actionTypes.GET_PINCODES_FAIL, payload: error.message });
  }
};
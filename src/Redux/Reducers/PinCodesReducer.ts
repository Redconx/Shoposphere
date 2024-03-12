import * as actionType from "../Constants/PinCodeConstant";

interface Pincode {
  // Define the properties of a Pincode object
}

export interface PincodesState {
  pincodes: Pincode[];
  error?: any;
}

const initialPincodesState: PincodesState = {
  pincodes: [],
};

export const getPincodesReducer = (
  state = initialPincodesState,
  action: any
): PincodesState => {
  switch (action.type) {
    case actionType.GET_PINCODES_SUCCESS:
      return { pincodes: action.payload };
    case actionType.GET_PINCODES_FAIL:
      return { error: action.payload, pincodes: [] };
    default:
      return state;
  }
};
import * as actionType from "../Constants/MobileConstant";

interface Mobile {
  // Define the properties of a Mobile object
}

export interface MobilesState {
  mobiles?: Mobile[];
  loading1: boolean;
  error?: any;
}

export const initialMobilesState: MobilesState = {
  mobiles: [],
  loading1: false,
};

export const getMobilesReducer = (
  state = initialMobilesState,
  action: any
): MobilesState => {
  switch (action.type) {
    case actionType.GET_MOBILE_REQUEST:
      return { loading1: true, mobiles: [] };
    case actionType.GET_MOBILE_SUCCESS:
      return { loading1: false, mobiles: action.payload };
    case actionType.GET_MOBILE_FAIL:
      return { loading1: false, error: action.payload };
    default:
      return state;
  }
};

export interface MobileDetailsState {
  mobile1?: Mobile | {};
  loading1?: boolean;
}

const initialMobileDetailsState: MobileDetailsState = {
  mobile1: {},
  loading1: false,
};

export const getMobileDetailsReducer = (
  state = initialMobileDetailsState,
  action: any
): MobileDetailsState => {
  switch (action.type) {
    case actionType.GET_MOBILE_DETAILS_REQUEST:
      return { loading1: true };
    case actionType.GET_MOBILE_DETAILS_SUCCESS:
      return { loading1: false, mobile1: action.payload };
    case actionType.GET_MOBILE_DETAILS_FAIL:
      return { loading1: false, mobile1: action.payload };
    case actionType.GET_MOBILE_DETAILS_RESET:
      return { mobile1: {} };
    default:
      return state;
  }
};
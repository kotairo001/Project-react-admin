import * as types from "../constants/actionType";

let initialValues = "";
const VaccineDetail = (state = initialValues, action) => {
  switch (action.type) {
    case types.SHOW_VACCINE:
      state = action.payload
      return state ;
    default:
      return state;
  }
};

export default VaccineDetail;
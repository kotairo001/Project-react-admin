import * as types from "../constants/actionType";

let initialValues = "";
const HospitalDetail = (state = initialValues, action) => {
  switch (action.type) {
    case types.SHOW_HOSPITAL:
      state = action.payload
      return state ;
    default:
      return state;
  }
};

export default HospitalDetail;

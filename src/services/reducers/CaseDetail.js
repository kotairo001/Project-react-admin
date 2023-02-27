import * as types from "../constants/actionType";

let initialValues = "";
const CaseDetail = (state = initialValues, action) => {
  switch (action.type) {
    case types.SHOW_CASE:
      state = action.payload
      return state ;
    default:
      return state;
  }
};

export default CaseDetail;

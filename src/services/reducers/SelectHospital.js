import * as types from "../constants/actionType";

let initialValues = "";
const SelectHospital = (state = initialValues, action) => {
  switch (action.type) {
    case types.SELECT_HOSPITAL:
      state = action.payload
      return state ;
    default:
      return state;
  }
};

export default SelectHospital;

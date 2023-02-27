import * as types from "../constants/actionType";

let initialValues = "";
const SelectVaccine = (state = initialValues, action) => {
  switch (action.type) {
    case types.SELECT_VACCINE:
      console.log(action.payload);
      state = action.payload
      return state ;
    default:
      return state;
  }
};

export default SelectVaccine;

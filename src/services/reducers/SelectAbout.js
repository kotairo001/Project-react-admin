import * as types from "../constants/actionType";

let initialValues = "";
const SelectAbout = (state = initialValues, action) => {
  switch (action.type) {
    case types.SELECT_ABOUT:
      state = action.payload
      return state ;
    default:
      return state;
  }
};

export default SelectAbout;

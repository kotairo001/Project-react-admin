import * as types from "../constants/actionType";

let initialValues = "";
const SelectCase = (state = initialValues, action) => {
  switch (action.type) {
    case types.SELECT_CASE:
      state = action.payload
      return state ;
    default:
      return state;
  }
};

export default SelectCase;

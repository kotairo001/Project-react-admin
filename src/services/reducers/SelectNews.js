import * as types from "../constants/actionType";

let initialValues = "";
const SelectNews = (state = initialValues, action) => {
  switch (action.type) {
    case types.SELECT_NEWS:
      state = action.payload
      return state ;
    default:
      return state;
  }
};

export default SelectNews;

import * as types from "../constants/actionType";

let initialValues = "";
const NewsDetail = (state = initialValues, action) => {
  switch (action.type) {
    case types.SHOW_NEWS:
      state = action.payload
      return state ;
    default:
      return state;
  }
};

export default NewsDetail;

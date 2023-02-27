import * as types from "../constants/actionType";

let initialValues = "";
const AboutDetail = (state = initialValues, action) => {
  switch (action.type) {
    case types.SHOW_ABOUT:
      console.log(action.payload);
      state = action.payload
      return state ;
    default:
      return state;
  }
};

export default AboutDetail;

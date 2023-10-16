const { BRIQUE_ACTION_TYPE } = require("../action-type");

let initialState = {
  formCategory: [],
};

const briQueReducer = (state = initialState, action) => {
  switch (action.type) {
    case BRIQUE_ACTION_TYPE.FORM_CATEGORIES:
      return { ...state, formCategory: action.payload };

    default:
      return state;
  }
};

export default briQueReducer;

import { BRIQUE_ACTION_TYPE } from "../action-types";

let initialState = {
  formCategory: [],
  getServices: [],
  formStructure: [],
};

const briQueReducer = (state = initialState, action) => {
  switch (action.type) {
    case BRIQUE_ACTION_TYPE.FORM_CATEGORIES:
      return { ...state, formCategory: action.payload };
    case BRIQUE_ACTION_TYPE.GET_SERVICES:
      return { ...state, getServices: action.payload };
    case BRIQUE_ACTION_TYPE.FORM_STRUCTURES:
      return { ...state, formStructure: action.payload };

    default:
      return state;
  }
};

export default briQueReducer;

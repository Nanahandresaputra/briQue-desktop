import { formCategoryApi } from "../../api";
import { BRIQUE_ACTION_TYPE } from "../action-type";

export const formCategoryAction = () => {
  return (dispatch) => {
    formCategoryApi()
      .then((res) => {
        if (res.errorCode === "1000") {
          dispatch({
            type: BRIQUE_ACTION_TYPE.FORM_CATEGORIES,
            payload: res,
          });
        } else {
          throw new Error(res);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

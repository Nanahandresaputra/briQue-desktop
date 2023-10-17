// import axios from "axios";

import axios from "axios";
import { BRIQUE_ACTION_TYPE } from "../action-types";

const apiConfig = window.samleAppConfig;

// export const formCategoryApi = async () => {
//   const category = await axios.get(
//     `${apiConfig.baseUrl}/${apiConfig.formCategory}`
//   );
//   return category.data;
// };

const setFormCategoryApi = (payload) => {
  return {
    type: BRIQUE_ACTION_TYPE.FORM_CATEGORIES,
    payload,
  };
};

const setFormStructure = (payload) => {
  return {
    type: BRIQUE_ACTION_TYPE.FORM_STRUCTURES,
    payload,
  };
};

const setGetServices = (payload) => {
  return {
    type: BRIQUE_ACTION_TYPE.GET_SERVICES,
    payload,
  };
};

const formCategoryAction = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: `${apiConfig.baseUrl}/${apiConfig.formCategory}`,
      })
        .then(({ data }) => {
          if (data.errorCode === "1000") {
            dispatch(setFormCategoryApi(data));
            resolve(data);
          } else {
            reject(data);
          }
        })
        .catch((error) => {
          if (error.name && error.name === "AxiosError") {
            reject({ errorCode: error.code, errorMssg: error.message });
          } else {
            reject(error);
          }
        });
    });
  };
};

const formStructureAction = (formName) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: `${apiConfig.baseUrl}/${apiConfig.formStructure}${formName}`,
      })
        .then(({ data }) => {
          if (data.errorCode === "1000") {
            dispatch(setFormStructure(data));
            resolve(data);
          } else {
            reject(data);
          }
        })
        .catch((error) => {
          if (error.name && error.name === "AxiosError") {
            reject({ errorCode: error.code, errorMssg: error.message });
          } else {
            reject(error);
          }
        });
    });
  };
};

export const BRIQUE_ACTION = {
  formCategoryAction,
  setGetServices,
  formStructureAction,
};

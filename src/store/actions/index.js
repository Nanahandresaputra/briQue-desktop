// import axios from "axios";

import axios from "axios";
import { BRIQUE_ACTION_TYPE } from "../action-types";

const apiConfig = window.samleAppConfig;

console.log(apiConfig);

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

const setListForm = (payload) => {
  return {
    type: BRIQUE_ACTION_TYPE.FORM_LIST,
    payload,
  };
};

const setSubmission = (payload) => {
  return {
    type: BRIQUE_ACTION_TYPE.SUBMISSION,
    payload,
  };
};

const setIsGetLoading = (payload) => {
  return {
    type: BRIQUE_ACTION_TYPE.IS_GET_LOADING,
    payload,
  };
};

const setGetEmail = (payload) => {
  return {
    type: BRIQUE_ACTION_TYPE.GET_EMAIL,
    payload,
  };
};

const setPhotoBase64 = (payload) => {
  return {
    type: BRIQUE_ACTION_TYPE.GET_PHOTO,
    payload,
  };
};

const formCategoryAction = () => {
  return (dispatch) => {
    dispatch(setIsGetLoading(true));
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: `${apiConfig.baseUrl}/${apiConfig.formCategory}`,
      })
        .then(({ data }) => {
          if (data.errorCode === "1000") {
            localStorage.setItem("formData", JSON.stringify(data));
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
        })
        .finally(() => dispatch(setIsGetLoading(false)));
    });
  };
};

const formStructureAction = (formName) => {
  return (dispatch) => {
    dispatch(setIsGetLoading(true));
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
        })
        .finally(() => dispatch(setIsGetLoading(false)));
    });
  };
};

const submissionAction = (data) => {
  return (dispatch) => {
    dispatch(setIsGetLoading(true));
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `${apiConfig.baseUrl}/${apiConfig.formSubmission}`,
        data,
      })
        .then(({ data }) => {
          if (data.errorCode === "1000") {
            dispatch(setSubmission(data));
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
        })
        .finally(() => dispatch(setIsGetLoading(false)));
    });
  };
};

const uploadPhotoAction = (data) => {
  return (dispatch) => {
    dispatch(setIsGetLoading(true));
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `${apiConfig.baseUrl}/${apiConfig.uploadPhoto}`,
        data,
      })
        .then(({ data }) => {
          if (data.errorCode === "1000") {
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
        })
        .finally(() => dispatch(setIsGetLoading(false)));
    });
  };
};

export const BRIQUE_ACTION = {
  submissionAction,
  formCategoryAction,
  setGetServices,
  formStructureAction,
  setFormCategoryApi,
  setFormStructure,
  setListForm,
  setIsGetLoading,
  setGetEmail,
  setPhotoBase64,
  uploadPhotoAction,
};

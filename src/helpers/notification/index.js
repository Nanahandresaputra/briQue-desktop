import { notification } from "antd";

export const openNotifications = (type, errMsg, descript) => {
  notification[type]({
    message: errMsg,
    description: descript,
    placement: "top",
  });
};

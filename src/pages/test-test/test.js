import { Button } from "antd";
import { useDispatch } from "react-redux";
import { BRIQUE_ACTION } from "../../store/actions";
import { openNotifications } from "./../../helpers/notification/index";

const Testing = () => {
  const dispatch = useDispatch();

  const apiHandler = () => {
    dispatch(BRIQUE_ACTION.formCategoryAction()).catch(({ errorMssg }) => {
      if (errorMssg) {
        openNotifications("error", "Error", errorMssg);
      }
    });
  };

  return (
    <section className="">
      <Button type="danger" onClick={apiHandler}>
        click
      </Button>
    </section>
  );
};

export default Testing;

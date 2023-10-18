import { Button } from "antd";
import { useDispatch } from "react-redux";
import { BRIQUE_ACTION } from "../../store/actions";
import { openNotifications } from "./../../helpers/notification/index";
import { v4 as uuidv4 } from "uuid";

const Testing = () => {
  const dispatch = useDispatch();
  let id = uuidv4();

  const apiHandler = () => {
    console.log(id.replace(/-/gi, ""));
    // dispatch(BRIQUE_ACTION.formCategoryAction()).catch(({ errorMssg }) => {
    //   if (errorMssg) {
    //     openNotifications("error", "Error", errorMssg);
    //   }
    // });
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

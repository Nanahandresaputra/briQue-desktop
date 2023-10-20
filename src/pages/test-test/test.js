import { Button } from "antd";
import { useDispatch } from "react-redux";
import { BRIQUE_ACTION } from "../../store/actions";
import { v4 as uuidv4 } from "uuid";
import { encryptContent } from "./../../helpers/encrypt/index";
import moment from "moment/min/moment-with-locales";

const Testing = () => {
  let body = {
    outletCode: "0206",
    bookingDate: moment().format("YYYY-MM-DD"),
    email: "test@example.com",
    source: 2,
    isSpecial: 0,
    listForm: [
      {
        nomorRekening: "423432423777767",
        namaNasabah: "kjkjkkj",
        briqueFormName: "transaksiLainnyaFinansial",
      },
    ],
  };

  let encrypt = encryptContent(body);

  const apiHandler = () => {
    console.log(encrypt);
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

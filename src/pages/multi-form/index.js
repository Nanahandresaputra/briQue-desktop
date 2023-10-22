import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import TopBar from "../../components/topbar";
import { useDispatch, useSelector } from "react-redux";
import CardMultiForm from "../../components/multi-form/card-multi-form";
import moment from "moment";
import { openNotifications } from "../../helpers/notification";
import { BRIQUE_ACTION } from "../../store/actions";
import { encryptContent } from "../../helpers/encrypt";

const MultiForm = ({ outletCode }) => {
  const { getServices, listForm, getEmail } = useSelector((state) => state.briQueReducer);
  const navigate = useNavigate();

  console.log(listForm);

  const dispatch = useDispatch();

  const submissionFunctions = () => {
    let body = {
      outletCode,
      bookingDate: moment().format("YYYY-MM-DD"),
      email: getEmail,
      source: 2,
      isSpecial: 0,
      listForm,
    };

    // dispatch(BRIQUE_ACTION.submissionAction(encryptContent(body)))
    //   .then(() => {
    //     openNotifications("success", "Success");
    //     navigate("/booking-success");
    //   })
    //   .catch(({ errorMssg }) => {
    //     openNotifications("error", "Error", errorMssg);
    //   });

    //offline mode
    navigate("/booking-success");
  };

  return (
    <section className="h-full max-h-[550px]">
      <TopBar>Multi Form</TopBar>
      <div className={`my-7 flex justify-center ${getServices.length < 5 ? "h-full" : "h-auto"}`}>
        <div className="space-y-3 w-8/12">
          <h1 className="text-white text-lg font-semibold">Pilih Reservasi Transaksi</h1>
          <div className="space-y-5">
            {getServices?.map((data, index) => (
              <CardMultiForm data={data} key={index} listForm={listForm}>
                {data.displayName}
              </CardMultiForm>
            ))}
          </div>
        </div>
      </div>
      <Footer btnDisabled={getServices?.length === listForm?.length ? false : true} onClick={submissionFunctions}>
        Selanjutnya
      </Footer>
    </section>
  );
};

export default MultiForm;

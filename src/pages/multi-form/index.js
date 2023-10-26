import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import TopBar from "../../components/topbar";
import { useDispatch, useSelector } from "react-redux";
import CardMultiForm from "../../components/multi-form/card-multi-form";
import moment from "moment";
import { openNotifications } from "../../helpers/notification";
import { BRIQUE_ACTION } from "../../store/actions";
import { encryptContent } from "../../helpers/encrypt";

const MultiForm = ({ outletCode }) => {
  const { listForm } = useSelector((state) => state.briQueReducer);

  let { state } = useLocation();

  console.log(state);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  let listFormData = listForm?.map((data) => data.form);

  const submissionFunctions = () => {
    let body = {
      outletCode,
      bookingDate: moment().format("YYYY-MM-DD"),
      email: state.getEmail,
      source: 2,
      isSpecial: 0,
      listForm: listFormData,
    };

    dispatch(BRIQUE_ACTION.submissionAction(encryptContent(body)))
      .then(() => {
        openNotifications("success", "Success");
        navigate("/booking-success");
      })
      .catch(({ errorMssg }) => {
        openNotifications("error", "Error", errorMssg);
      });

    //offline mode
    // navigate("/booking-success");
  };

  console.log({
    outletCode,
    bookingDate: moment().format("YYYY-MM-DD"),
    email: state?.getEmail,
    source: 2,
    isSpecial: 0,
    listForm: listFormData,
  });

  return (
    <section className="h-full max-h-[550px]">
      <TopBar>Multi Form</TopBar>
      <div
        className={`my-7 flex justify-center ${
          state.getServices?.length < 5 ? "h-full" : "h-auto"
        }`}>
        <div className="space-y-3 w-8/12">
          <h1 className="text-white text-lg font-semibold">
            Pilih Reservasi Transaksi
          </h1>
          <div className="space-y-5">
            {state.getServices?.map((data, index) => (
              <CardMultiForm
                data={data}
                key={index}
                listForm={listForm}
                stateData={state}>
                {data.displayName}
              </CardMultiForm>
            ))}
          </div>
        </div>
      </div>
      <Footer
        btnDisabled={
          state.getServices?.length === listForm?.length ? false : true
        }
        onClick={submissionFunctions}>
        Selanjutnya
      </Footer>
    </section>
  );
};

export default MultiForm;

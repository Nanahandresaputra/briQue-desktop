import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import TopBar from "../../components/topbar";
import { useSelector } from "react-redux";
import CardMultiForm from "../../components/multi-form/card-multi-form";

const MultiForm = () => {
  const { getServices } = useSelector((state) => state.briQueReducer);
  const navigate = useNavigate();
  const navigatePage = () => {
    navigate("/");
  };

  console.log(getServices);
  return (
    <section className="h-full max-h-[550px]">
      <TopBar>Multi Form</TopBar>
      <div className="my-7 flex justify-center h-full">
        <div className="space-y-3 w-8/12">
          <h1 className="text-white text-lg font-semibold">
            Pilih Reservasi Transaksi
          </h1>
          <div className="space-y-5">
            {getServices?.map((data, index) => (
              <CardMultiForm key={index}>{data}</CardMultiForm>
            ))}
          </div>
        </div>
      </div>
      <Footer btnDisabled={true} onClick={navigatePage}>
        Selanjutnya
      </Footer>
    </section>
  );
};

export default MultiForm;

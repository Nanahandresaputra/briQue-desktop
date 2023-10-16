import TopBar from "../../components/topbar";
import CardCategoryFinancial from "../../components/financial-service/card-category-financial";
import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";

const FinancialService = () => {
  const navigate = useNavigate();
  const navigatePage = () => {
    navigate("/foto-nasabah");
  };
  return (
    <section>
      <TopBar>Layanan Finansial</TopBar>
      <div className="mt-7 flex justify-center h-fit items-center">
        <div className="space-y-3 w-8/12">
          <h1 className="text-white text-lg font-semibold">Pilih Reservasi Transaksi</h1>
          <CardCategoryFinancial />
          <CardCategoryFinancial />
          <CardCategoryFinancial />
          <CardCategoryFinancial />
          <CardCategoryFinancial />
          <CardCategoryFinancial />
          <CardCategoryFinancial />
          <CardCategoryFinancial />
          <CardCategoryFinancial />
          <CardCategoryFinancial />
          <CardCategoryFinancial />
          <CardCategoryFinancial />
        </div>
      </div>
      <Footer onClick={navigatePage}>Selanjutnya</Footer>
    </section>
  );
};

export default FinancialService;

import { Card } from "antd";
import { FaMoneyBillWave } from "react-icons/fa";
const CardCategoryFinancial = () => {
  return (
    <Card className="shadow-lg flex items-center justify-between w-96">
      <FaMoneyBillWave />
      <p>Setoran Tunai</p>
    </Card>
  );
};

export default CardCategoryFinancial;

import { Button } from "antd";
import { FaMoneyBillWave } from "react-icons/fa";
const CardCategoryFinancial = () => {
  return (
    <section className="flex items-center space-x-3">
      <div className="px-3 bg-gray-50 rounded-lg shadow-2xl flex-1">
        <div className="flex items-center justify-between text-blue-700">
          <FaMoneyBillWave className="text-6xl" />
          <p className="text-xl font-medium text-blue-900">Setoran Tunai</p>
          <div className="flex space-x-3 items-center text-blue-900">
            <Button>-</Button>
            <p className="text-xl font-medium">4</p>
            <Button>+</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardCategoryFinancial;

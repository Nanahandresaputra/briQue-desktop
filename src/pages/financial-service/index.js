import React from "react";
import TopBar from "../../components/topbar";
import CardCategoryFinancial from "../../components/financial-service/card-category-financial";

const FinancialService = () => {
  return (
    <section>
      <TopBar />
      <div className="flex justify-center">
        <CardCategoryFinancial />
      </div>
    </section>
  );
};

export default FinancialService;

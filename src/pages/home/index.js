import React from "react";
import CardTransaction from "../../components/home/card-transaction";

const Home = () => {
  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-6xl">
        <span className="text-white">BRI</span>
        <span className="text-orange-500">QUE</span>
      </h1>
      <div>
        <h2 className="text-white font-semibold">Pilih Pelayanan</h2>
        <div className="flex justify-center items-center space-x-7">
          <CardTransaction imgCover="./assets/svg/financial.svg">
            <h1 className="text-2xl font-medium">Financial </h1>
            <p className="text-gray-500  font-medium">
              Setoran Tunai, Overbooking, Setoran Tunai, Overbooking
            </p>
          </CardTransaction>
          <CardTransaction imgCover="./assets/svg/non-financial.svg">
            <h1 className="text-2xl font-medium">Non-FInancial</h1>
            <p className="text-gray-500  font-medium">
              Setoran Tunai, Overbooking, Setoran Tunai, Overbooking
            </p>
          </CardTransaction>
        </div>
      </div>
    </section>
  );
};

export default Home;

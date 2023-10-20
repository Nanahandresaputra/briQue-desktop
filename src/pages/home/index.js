import React, { useEffect } from "react";
import CardTransaction from "../../components/home/card-transaction";
import { useDispatch, useSelector } from "react-redux";
import { BRIQUE_ACTION } from "../../store/actions";
import { openNotifications } from "./../../helpers/notification/index";
import { formCategoryDummy } from "./../../dummy-data/form-category";

const Home = () => {
  const { formCategory } = useSelector((state) => state.briQueReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(BRIQUE_ACTION.formCategoryAction()).catch(({ errorMssg }) => {
      openNotifications("error", "Error", errorMssg);
    });

    //dummy
    // dispatch(BRIQUE_ACTION.setFormCategoryApi(formCategoryDummy));
  }, []);

  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-6xl">
        <span className="text-white">BRI</span>
        <span className="text-orange-500">QUE</span>
      </h1>
      <div>
        <h2 className="text-white font-semibold">Pilih Pelayanan</h2>
        <div className="flex justify-center items-center space-x-7">
          {formCategory.categories?.map((data, index) => (
            <CardTransaction
              link={data.name}
              imgCover={
                data.name === "financial"
                  ? "./assets/svg/financial.svg"
                  : "./assets/svg/non-financial.svg"
              }
              key={index}>
              <h1 className="text-2xl font-medium text-blue-900">
                {data.displayName}
              </h1>
              <p className="text-gray-500 h-20 font-medium">
                {data.forms
                  ?.slice(0, 3)
                  ?.map((data) => data.displayName)
                  .toString()}
                , dan Lainnya.
              </p>
            </CardTransaction>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;

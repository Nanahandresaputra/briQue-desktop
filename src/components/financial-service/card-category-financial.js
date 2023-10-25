import { Button } from "antd";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { BiMoneyWithdraw, BiSolidUserAccount } from "react-icons/bi";
import { BsBank, BsFillMenuButtonWideFill } from "react-icons/bs";
import { ImCreditCard } from "react-icons/im";
import { MdPhoneAndroid } from "react-icons/md";
import { RiBookReadFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { BRIQUE_ACTION } from "../../store/actions";
import { v4 as uuidv4 } from "uuid";

const CardCategoryFinancial = ({ data, service, getServices, category }) => {
  const dispatch = useDispatch();

  let icons = [
    {
      type: "financial",
      icons:
        data.name === "moneyChanger" ? (
          <BiMoneyWithdraw className="text-6xl" />
        ) : data.name === "layananKhususFinansial" ? (
          <BsBank className="text-6xl" />
        ) : data.name === "transaksiLainnyaFinansial" ? (
          <BsFillMenuButtonWideFill className="text-6xl" />
        ) : data.name === "paymentBriva" ||
          data.name === "setorTunaiWIC" ||
          data.name === "pencairanCekBg" ||
          data.name === "tarikTunai" ||
          data.name === "setoranTunai" ? (
          <FaMoneyBillTransfer className="text-6xl" />
        ) : (
          <ImCreditCard className="text-6xl" />
        ),
    },
    {
      type: "nonFinancial",
      icons:
        data.name === "registrasiNotifikasi" ||
        data.name === "registrasiInternetBanking" ? (
          <MdPhoneAndroid className="text-6xl" />
        ) : data.name === "penggantianBukuTabungan" ||
          data.name === "pencetakanBukuTabungan" ||
          data.name === "pencetakanRekeningKoran" ? (
          <RiBookReadFill className="text-6xl" />
        ) : data.name === "transaksiLainnyaNonFinansial" ? (
          <BsFillMenuButtonWideFill className="text-6xl" />
        ) : data.name === "pencairanDeposito" ? (
          <FaMoneyBillTransfer className="text-6xl" />
        ) : data.name === "layananFasilitasCekBilyeGiro" ? (
          <BsBank className="text-6xl" />
        ) : data.name === "openAccount" ? (
          <BiSolidUserAccount className="text-6xl" />
        ) : data.name === "transaksiLainnyaNonFinansial" ? (
          <BsFillMenuButtonWideFill className="text-6xl" />
        ) : (
          <ImCreditCard className="text-6xl" />
        ),
    },
  ];

  let counter = getServices?.filter((datas) => datas.name === data.name)?.length
    ? getServices?.filter((datas) => datas.name === data.name)?.length
    : 0;

  let dataService = { ...data, id: uuidv4().replace(/-/gi, "") };

  const increment = () => {
    dispatch(BRIQUE_ACTION.setGetServices([...getServices, dataService]));
  };

  let disabledMaxLength = () => {
    return getServices.length > 8 && category.name === "financial"
      ? true
      : getServices.length > 3 && category.name === "nonFinancial"
      ? true
      : false;
  };

  const decrement = () => {
    // let sameValue = getServices.sameValueOf(data.id);
    let sameValue = getServices
      ?.filter((data) => data.name === dataService.name)
      .at(-1);

    sameValue
      ? dispatch(
          BRIQUE_ACTION.setGetServices(
            getServices.filter((datas) => datas.id != sameValue.id)
          )
        )
      : dispatch(BRIQUE_ACTION.setGetServices(getServices));
    // getServices.filter((datas) => datas.name != dataService.name);
  };
  return (
    <section className="flex items-center space-x-3">
      <div className="px-3 bg-gray-50 rounded-lg shadow-2xl flex-1">
        <div className="flex items-center justify-between text-blue-700">
          {icons?.find((data) => data.type === service).icons}
          <p className="text-xl font-semibold text-blue-900">
            {data.displayName}
          </p>
          <div className="flex space-x-3 items-center text-blue-900">
            <Button onClick={decrement} disabled={counter < 1 ? true : false}>
              -
            </Button>
            <p className="text-xl font-medium">{counter}</p>
            <Button disabled={disabledMaxLength()} onClick={increment}>
              +
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardCategoryFinancial;

import { Button } from "antd";
import { BsRepeat } from "react-icons/bs";

const NetworkError = () => {
  return (
    <section className="h-screen w-screen flex items-center justify-center">
      <h1 className="font-bold text-6xl">
        <span className="text-white">BRI</span>
        <span className="text-orange-500">QUE</span>
      </h1>
      <div>
        <img src="./assets/svg/network-error.svg" alt="error" />
        <p className="text-xl font-semibold text-blue-900">Sepertinya sedang ada masalah pada jaringan atau server, silakan muat ulang halaman atau hubungi petugas bank</p>
      </div>
      <Button type="" className="text-blue-500 bg-white border border-blue-500 w-72 flex items-center justify-center space-x-2" size="large">
        <BsRepeat className="text-2xl" /> <span className="text-lg font-semibold">Ulangi</span>
      </Button>
    </section>
  );
};

export default NetworkError;

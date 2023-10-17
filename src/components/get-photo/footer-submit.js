import { Button } from "antd";
import { AiOutlineMail } from "react-icons/ai";

const FooterSubmit = ({ getCapture }) => {
  return (
    <nav className="sticky bottom-0 z-30 bg-[#E8F3FC] bg-opacity-80 backdrop-blur-sm flex justify-between items-center space-x-8 px-5 py-3 shadow-lg w-10/12">
      <div className="flex items-center space-x-5">
        <AiOutlineMail className="text-blue-700 text-4xl" />
        <p className="block">
          <span className="font-semibold text-blue-900 underline hover:cursor-pointer">
            Isi Alamat Email
          </span>{" "}
          <br />
          <span className="text-red-500 text-sm w-96 block">
            *Jika anda tidak memiliki email pilih submit untuk melakukan
            reservasi
          </span>
        </p>
      </div>
      <Button
        type="primary"
        className="bg-blue-700 w-72 text-lg"
        size="large"
        onClick={(e) => {
          e.preventDefault();
          getCapture();
        }}>
        Submit{" "}
      </Button>
    </nav>
  );
};

export default FooterSubmit;

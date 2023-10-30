import { Button } from "antd";
import { AiOutlineMail } from "react-icons/ai";
import { BsCameraFill, BsRepeat } from "react-icons/bs";
import { SiGoogleforms } from "react-icons/si";
import { useDispatch } from "react-redux";
import { BRIQUE_ACTION } from "../../store/actions";

const FooterSubmit = ({ capture, photoBase64, navigateToForm, showModal }) => {
  const dispatch = useDispatch();
  return (
    <nav className="fixed  bottom-0 z-30 bg-[#E8F3FC] bg-opacity-80 backdrop-blur-sm flex justify-between items-center space-x-8 px-5 py-3 shadow-lg w-10/12">
      <div className="flex items-center space-x-5">
        <AiOutlineMail className="text-blue-700 text-4xl" />
        <p className="block">
          <span
            className="font-semibold text-blue-900 underline hover:cursor-pointer"
            onClick={showModal}>
            Isi Alamat Email
          </span>{" "}
          <br />
          <span className="text-red-500 text-sm w-96 block">
            *Jika anda tidak memiliki email pilih submit setelah ambil gambar
            untuk melakukan reservasi
          </span>
        </p>
      </div>
      <div className={`space-y-3 ${photoBase64 ? "block" : "hidden"}`}>
        <Button
          type="primary"
          className="bg-blue-700 w-72 flex items-center justify-center space-x-2"
          size="large"
          onClick={navigateToForm}>
          <SiGoogleforms className="text-2xl" />{" "}
          <span className="text-lg font-semibold">Submit</span>
        </Button>

        <Button
          type=""
          className="text-blue-500 bg-white border border-blue-500 w-72 flex items-center justify-center space-x-2"
          size="large"
          onClick={() => dispatch(BRIQUE_ACTION.setPhotoBase64(null))}>
          <BsRepeat className="text-2xl" />{" "}
          <span className="text-lg font-semibold">Ulangi</span>
        </Button>
      </div>
      <Button
        type="primary"
        className={`bg-blue-700 w-72  items-center justify-center space-x-2 ${
          photoBase64 ? "hidden" : "flex"
        }`}
        size="large"
        onClick={(e) => {
          e.preventDefault();
          capture();
        }}>
        <BsCameraFill className="text-2xl" />{" "}
        <span className="text-lg font-semibold">Ambil Gambar</span>
      </Button>
    </nav>
  );
};

export default FooterSubmit;

{
  /* <Button
          type="primary"
          className="bg-blue-700 w-72 text-lg"
          size="large"
          onClick={(e) => {
            e.preventDefault();
            capture();
          }}
        >
          Submit{" "}
        </Button> */
}

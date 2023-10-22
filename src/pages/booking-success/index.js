import { Button, QRCode } from "antd";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import QueuePrint from "../../components/queue-print";
import moment from "moment/min/moment-with-locales";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formSubmissionDummy } from "../../dummy-data/form-submission";
import { BRIQUE_ACTION } from "../../store/actions";
import { openNotifications } from "../../helpers/notification";
const BookingSuccess = () => {
  // const { submissionData } = useSelector((state) => state.briQueReducer);
  const { photoBase64 } = useSelector((state) => state.briQueReducer);

  //dummy submission
  let submissionData = formSubmissionDummy;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (submissionData.bookingCode && photoBase64) {
      dispatch(BRIQUE_ACTION.uploadPhotoAction({ bookingCode: submissionData.bookingCode, photoBase64: photoBase64.replace("data:image/webp;base64,", "") })).catch(({ errorMssg }) => {
        openNotifications("error", "Error", errorMssg);
      });
    }
  }, []);

  // console.log({
  //   bookingCode: submissionData.bookingCode,
  //   photoBase64: photoBase64.replace("data:image/webp;base64,", ""),
  // });

  return (
    <section className="flex flex-col h-full space-y-5 items-center ">
      <h3 className="font-bold text-6xl/3 ">
        <span className="text-white">BRI</span>
        <span className="text-orange-500">QUE</span>
      </h3>
      <div className="w-9/12 flex flex-col items-center relative rounded shadow-lg">
        <BsFillCheckCircleFill className="text-5xl text-center text-green-500 bg-white rounded-full p-2 absolute -mt-8" />
        <div className="bg-white w-full flex flex-col items-center py-9">
          <h1 className="text-blue-900 text-xl/[1px] ">Reservasi Berhasil</h1>
          <p className="text-4xl/[2px]  font-bold text-blue-900">{submissionData.queueNo}</p>
          <div>
            <QRCode value={submissionData.bookingCode} />
            <p className="text-xs text-gray-400 text-center italic">{submissionData.bookingCode}</p>
          </div>
          <div className="mt-2 flex flex-col items-center">
            <p className="text-sm/[1px] font-semibold text-blue-900">Nomor Referensi</p>

            <p className="text-sm/[1px] font-semibold text-blue-900">{submissionData.referenceCodeList.length > 0 ? submissionData.referenceCodeList.toString() : "-"}</p>

            <p className="text-sm/[1px] font-semibold text-blue-900 ">{moment().locale("id").format("LLLL")}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-8">
        <Button type="primary" className="p-5 bg-blue-700 font-semibold flex items-center space-x-1" onClick={() => navigate("/brique")}>
          <BsBank2 className="text-2xl" /> <span className="text-xl">Halaman Utama</span>
        </Button>
        <Button type="primary" className="p-5 bg-blue-700 font-semibold flex items-center space-x-1" onClick={handlePrint}>
          <FaFileAlt className="text-2xl" /> <span className="text-xl">Cetak Nomor Antrian</span>
        </Button>
      </div>

      <div className="hidden">
        <QueuePrint ref={componentRef} />
      </div>
    </section>
  );
};
// referenceCodeList
export default BookingSuccess;

{
  /* <div>
            <QRCode value="briqueNana" />
            <p  className="text-sm/[1px] font-semibold text-blue-900"></p>
          </div> */
}

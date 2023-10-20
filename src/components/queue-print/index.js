import { QRCode } from "antd";
import moment from "moment/min/moment-with-locales";
import { forwardRef } from "react";
import { useSelector } from "react-redux";

const QueuePrint = forwardRef((props, ref) => {
  const { submissionData } = useSelector((state) => state.briQueReducer);
  console.log(submissionData);

  return (
    <section
      className="bg-white h-full w-full flex flex-col items-center"
      ref={ref}>
      <div className="flex items-center my-4">
        <img
          src="./assets/svg/bri-black.svg"
          alt="logo"
          className="w-24 h-24"
        />
        <div>
          <h1 className="text-3xl/[1px] font-bold">BANK RAKYAT INDONESIA</h1>
        </div>
      </div>
      <div className="border-dashed w-11/12" />
      <div className="w-full flex flex-col items-center mt-2">
        <h1 className="text-xl">NOMOR ANTRIAN ANDA</h1>
        <p className="text-6xl/[1px] font-bold">{submissionData.queueNo}</p>
        <div className="-mt-3">
          <QRCode value={submissionData.bookingCode} size={200} />
          <p className="text-xl text-center">{submissionData.bookingCode} </p>
        </div>

        <div className="flex items-center space-x-8 mt-2">
          <p className="text-lg font-semibold col-span-2">Nomor Referensi</p>
          <p className="text-lg/[1px] font-semibold col-span-2">
            {submissionData.referenceCodeList.length > 0
              ? submissionData.referenceCodeList.toString()
              : "-"}
          </p>
        </div>
        <p className="text-lg font-semibold">
          SILAKAN MENUNGGU NOMOR ANTRIAN ANDA DIPANGGIL
        </p>
        <p className="text-xl font-semibold col-span-2 ">
          {" "}
          {moment().locale("id").format("LLLL")}
        </p>
      </div>
    </section>
  );
});

export default QueuePrint;

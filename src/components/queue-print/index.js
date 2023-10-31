import { QRCode } from "antd";
import moment from "moment/min/moment-with-locales";
import { forwardRef } from "react";
import { formSubmissionDummy } from "../../dummy-data/form-submission";

const QueuePrint = forwardRef((props, ref) => {
  let submissionData = props.submissionData;

  console.log(submissionData);

  //dummy submissionData
  // let submissionData = formSubmissionDummy;

  return (
    <section
      className="bg-white h-full flex flex-col items-center w-[80mm]"
      ref={ref}>
      <div className="flex justify-center items-center my-4 w-full">
        <img src="./assets/svg/bri-black.svg" alt="logo" className="w-8 h-8" />
        <div>
          <p className="text-lg/[0px] font-bold">BANK RAKYAT INDONESIA</p>
        </div>
      </div>
      <div className="border-dashed border-2 w-11/12" />
      <div className="w-full  mt-2">
        <p className="text-xs font-bold text-center">NOMOR ANTRIAN ANDA</p>
        <p className="text-[24px]/[0px] font-bold text-center">
          {submissionData?.queueNo}
        </p>
        <div className="w-full flex flex-col items-center">
          <QRCode value={submissionData?.bookingCode} size={140} />
          <p className="text-xs text-center">{submissionData?.bookingCode} </p>
        </div>
        <p className="text-[10px] font-semibold text-center">
          SISA ANTRIAN: {submissionData?.queueLeft} ORANG
        </p>
        <p className="text-[10px] text-center font-semibold">
          SILAKAN MENUNGGU NOMOR ANTRIAN ANDA DIPANGGIL
        </p>
        <p className="text-[10px] text-center font-semibold ">
          {moment().locale("id").format("LLLL").toUpperCase()}
        </p>
      </div>
    </section>
  );
});

export default QueuePrint;

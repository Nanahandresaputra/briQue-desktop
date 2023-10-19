import { QRCode } from "antd";
import { forwardRef } from "react";

const QueuePrint = forwardRef((props, ref) => {
  return (
    <section className="bg-white h-full w-full flex flex-col items-center overflow-hidden" ref={ref}>
      <div className="flex items-center my-4">
        <img src="./assets/svg/bri-black.svg" alt="logo" className="w-24 h-24" />
        <div>
          <h1 className="text-3xl/[1px] font-bold">BANK RAKYAT INDONESIA</h1>
          <p className="text-base/[1px]">BANK BRI KC JAKARTA GADING BOULEVARD</p>
        </div>
      </div>
      <div className="border-dashed w-11/12" />
      <div className="w-full flex flex-col items-center mt-2">
        <h1 className="text-xl">NOMOR ANTRIAN ANDA</h1>
        <p className="text-6xl/[1px] font-bold">C004</p>
        <div className="-mt-3">
          <QRCode value="briqueNana" size={200} />
          <p className="text-xs text-center">BQ2BHYU67OI4HPO9Y</p>
        </div>

        <div className="grid grid-cols-5  mt-2">
          <p className="text-base/[1px] font-semibold col-span-2">Nomor Referensi</p>
          <p className="text-base/[1px] font-semibold col-span-1 text-center">:</p>
          <p className="text-base/[1px] font-semibold col-span-2">-</p>
          <p className="text-base/[1px] font-semibold col-span-2">Tanggal</p>
          <p className="text-base/[1px] font-semibold col-span-1 text-center">:</p>
          <p className="text-base/[1px] font-semibold col-span-2 ">{`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear() + 1}`}</p>
        </div>

        <p className=" font-semibold">SILAKAN MENUNGGU NOMOR ANTRIAN ANDA DIPANGGIL</p>
      </div>
    </section>
  );
});

export default QueuePrint;

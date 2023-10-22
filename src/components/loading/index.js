import React from "react";
import { ClockLoader } from "react-spinners";

const Loading = ({ children, isGetLoading }) => {
  if (isGetLoading) {
    return (
      <section className="relative h-full w-full">
        {children}
        <div className="w-full h-full bg-black bg-opacity-20 flex items-center justify-center absolute top-0  z-50">
          <ClockLoader className="w-20" color="#E8F3FC" />
        </div>
      </section>
    );
  }
  return <section>{children}</section>;
};

export default Loading;

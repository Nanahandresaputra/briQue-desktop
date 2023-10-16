import { Button } from "antd";
import React from "react";

const Footer = ({ children, onClick }) => {
  return (
    <nav className="sticky bottom-0 z-30 bg-[#E8F3FC] bg-opacity-80 backdrop-blur-sm flex justify-end space-x-8 px-5 py-3 shadow-lg">
      <Button type="primary" className="bg-blue-700 w-72 text-lg" size="large" onClick={onClick}>
        {children}
      </Button>
    </nav>
  );
};

export default Footer;

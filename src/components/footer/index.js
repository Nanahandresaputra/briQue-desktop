import { Button } from "antd";
import React from "react";

const Footer = ({ children, onClick, btnDisabled }) => {
  return (
    <nav className="fixed w-full bottom-0 z-30 bg-[#E8F3FC] bg-opacity-40 backdrop-blur-sm flex justify-end space-x-8 py-5 shadow-lg">
      <Button
        disabled={btnDisabled}
        type="primary"
        className="bg-blue-700 w-72 py-4 text-lg me-8"
        size="large"
        onClick={onClick}>
        {children}
      </Button>
    </nav>
  );
};

export default Footer;

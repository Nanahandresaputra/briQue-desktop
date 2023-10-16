import { Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const CardTransaction = ({ children, imgCover }) => {
  const navigate = useNavigate();
  return (
    <Card
      size="small"
      className="w-72 shadow-2xl hover:scale-110 transition-all"
      hoverable
      cover={
        <img
          src={imgCover}
          alt="layanan"
          className="h-36 w-full rounded bg-sky-200"
        />
      }
      onClick={() => navigate("/layanan-finansial")}>
      {children}
    </Card>
  );
};

export default CardTransaction;

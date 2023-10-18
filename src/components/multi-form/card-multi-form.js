import { Button, Tag } from "antd";
import { LuClipboardEdit } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const CardMultiForm = ({ children, data }) => {
  const navigate = useNavigate();
  let params = JSON.stringify(data);
  return (
    <section className="p-3  h-full bg-gray-50 rounded-lg shadow-2xl text-blue-900">
      <div className="flex justify-between items-center">
        <p className="text-xl/[4px] font-semibold">{children}</p>
        <Button
          type="primary"
          icon={<LuClipboardEdit className="text-xl" />}
          size="large"
          onClick={() => {
            navigate(`/eform/${params}`);
          }}
        />
      </div>
      <Tag color="error">form belum diisi</Tag>
    </section>
  );
};

export default CardMultiForm;

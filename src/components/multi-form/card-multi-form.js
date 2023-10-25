import { Button, Tag } from "antd";
import { LuClipboardEdit } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const CardMultiForm = ({ children, data, listForm, stateData }) => {
  const navigate = useNavigate();
  let params = JSON.stringify({
    name: data.name,
    id: data.id,
  });

  console.log(listForm);

  return (
    <section className="p-3  h-full bg-gray-50 rounded-lg shadow-2xl text-blue-900">
      <div className="flex justify-between items-center">
        <p className="text-xl/[4px] font-semibold">{children}</p>
        <Button
          type="primary"
          icon={<LuClipboardEdit className="text-xl" />}
          size="large"
          onClick={() => {
            navigate(`/eform/${params}`, { state: stateData });
          }}
        />
      </div>
      {listForm?.find((dataId) => dataId.id === data.id) ? (
        <Tag color="success">form sudah diisi</Tag>
      ) : (
        <Tag color="error">form belum diisi</Tag>
      )}
    </section>
  );
};

export default CardMultiForm;

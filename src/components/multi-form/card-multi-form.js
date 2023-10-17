import { Button } from "antd";
import { LuClipboardEdit } from "react-icons/lu";

const CardMultiForm = ({ children }) => {
  return (
    <section className="px-3 flex justify-between items-center h-full bg-gray-50 rounded-lg shadow-2xl text-blue-900">
      <p className="text-xl font-semibold">{children}</p>
      <Button
        type="primary"
        icon={<LuClipboardEdit className="text-xl" />}
        size="large"
      />
    </section>
  );
};

export default CardMultiForm;

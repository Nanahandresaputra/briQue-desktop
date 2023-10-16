import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 backdrop-blur-sm flex items-center space-x-8 px-5 py-3 shadow-lg">
      <FaArrowLeft
        className="text-white text-3xl"
        onClick={() => navigate(-1)}
      />
      <p className="text-xl font-semibold text-white flex-1 text-center">
        Layanan Financial
      </p>
    </nav>
  );
};

export default TopBar;

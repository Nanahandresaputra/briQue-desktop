import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TopBar = ({ children }) => {
  const navigate = useNavigate();
  return (
    <nav className="fixed w-full top-0 bg-[#1583DD] z-30 flex justify-center py-3 shadow-lg">
      <div className="flex items-center justify-between w-10/12">
        <FaArrowLeft
          className="text-white text-3xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <p className="text-xl font-semibold text-white flex-1 text-center">
          {children}
        </p>
      </div>
    </nav>
  );
};

export default TopBar;

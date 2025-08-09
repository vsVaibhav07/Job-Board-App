import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ToggleButton = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div
      onClick={() => toggleDarkMode()}
      className={`w-14 h-7 flex items-center rounded-full cursor-pointer transition-all duration-300 ${
        darkMode ? "bg-black" : "bg-gray-300"
      } p-1`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ${
          darkMode ? "translate-x-7" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default ToggleButton;

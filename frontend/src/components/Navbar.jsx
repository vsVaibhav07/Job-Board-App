import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { AuthContext } from "../contexts/authContext";
import ToggleButton from "./ToggleButton";

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { darkMode } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const role = user?.role || "guest";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className={`${
        darkMode ? "bg-slate-800" : "bg-blue-500"
      } shadow-md px-6 py-3 w-full text-white flex justify-between items-center`}
    >
      <h1 className="text-xl sm:text-2xl font-bold">
        {role === "admin"
          ? "Recruiter Panel"
          : role === "user"
          ? "Jobs For You"
          : "Job Portal"}
      </h1>

      {role === "user" && (
        <input
          type="text"
          placeholder="Search by job title..."
          className="p-2 border-none rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}

      <div className="flex gap-4 items-center">
        {role === "admin" && (
          <>
            <Link to="/post-job">
              <button className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 transition">
                Post Job
              </button>
            </Link>
            <Link to="/applications">
              <button className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 transition">
                Applications
              </button>
            </Link>
          </>
        )}

        {user && (
          <button
            onClick={handleLogout}
            className={`px-4 py-1 cursor-pointer rounded transition ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-blue-700 text-white hover:bg-blue-600"
            }`}
          >
            Logout
          </button>
        )}

        <ToggleButton />
      </div>
    </nav>
  );
};

export default Navbar;

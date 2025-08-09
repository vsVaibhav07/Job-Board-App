import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import JobList from "../components/JobList";

const Home = () => {
  const { darkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  return (
    <div
      className={`w-screen min-h-screen overflow-x-hidden ${
        darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome {user ? user.name : "Guest"}
        </h2>

        <JobList />
      </div>
    </div>
  );
};

export default Home;

import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";

const JobCard = ({ job }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`p-5 border rounded-xl shadow-md transition-transform transform hover:scale-[1.02] ${
        darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-200"
      }`}
    >
      <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>

      <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
        <FaBriefcase />
        <span>{job.company}</span>
      </div>

      <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
        <FaMapMarkerAlt />
        <span>{job.location}</span>
      </div>

      <p className="text-sm mb-4 line-clamp-3">
        {job.description?.substring(0, 120)}...
      </p>

      <div className="flex gap-3">
        <Link
          to={`/jobs/${job._id}`}
          className="inline-block bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition"
        >
          View Details
        </Link>

        <Link
          to={`/apply/${job._id}`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default JobCard;

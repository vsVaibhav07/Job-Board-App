import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../contexts/ThemeContext";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setJob(res.data);
      } catch (err) {
        console.error("Error fetching job details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [id, token]);

  if (loading) return <p className="text-center mt-5 text-lg font-medium">Loading job details...</p>;
  if (!job) return <p className="text-center mt-5 text-lg font-medium">Job not found.</p>;

  return (
    <div
      className={`max-w-4xl mx-auto p-8 rounded-xl mt-8 border transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <h1 className="text-4xl font-extrabold mb-6">{job.title}</h1>

      <div className="mb-6">
        <h2 className={`text-lg font-semibold mb-1 ${darkMode ? "text-blue-400" : "text-blue-700"}`}>
          Company
        </h2>
        <p>{job.company}</p>
      </div>

      <div className="mb-6">
        <h2 className={`text-lg font-semibold mb-1 ${darkMode ? "text-blue-400" : "text-blue-700"}`}>
          Location
        </h2>
        <p>{job.location}</p>
      </div>

      <div className="mb-6">
        <h2 className={`text-lg font-semibold mb-1 ${darkMode ? "text-blue-400" : "text-blue-700"}`}>
          Job Description
        </h2>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
          {job.description}
        </p>
      </div>

      <p className={`text-sm mt-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        Posted on: {new Date(job.createdAt).toLocaleDateString()}
      </p>

      <button
        onClick={() => navigate(`/apply/${job._id}`)}
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;

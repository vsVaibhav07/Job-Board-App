import React, { useState, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';

const PostJob = () => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/jobs/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Job posted successfully!");
      setFormData({ title: "", company: "", location: "", description: "" });
      navigate("/applications");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job");
    }
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center px-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded-lg shadow-md w-full max-w-lg space-y-4 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-bold text-center">Post a New Job</h2>

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          className={`w-full px-4 py-2 rounded border focus:outline-none ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
              : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
          }`}
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          className={`w-full px-4 py-2 rounded border focus:outline-none ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
              : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
          }`}
          value={formData.company}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className={`w-full px-4 py-2 rounded border focus:outline-none ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
              : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
          }`}
          value={formData.location}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Short Description"
          rows={4}
          className={`w-full px-4 py-2 rounded border focus:outline-none resize-none ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
              : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
          }`}
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className={`w-full py-2 rounded font-semibold transition ${
            darkMode
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Post Job
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className={`w-full py-2 rounded font-semibold transition mt-2 ${
            darkMode
              ? "bg-gray-600 hover:bg-gray-700 text-white"
              : "bg-gray-300 hover:bg-gray-400 text-gray-900"
          }`}
        >
          Back to Home
        </button>
      </form>
    </div>
  );
};

export default PostJob;

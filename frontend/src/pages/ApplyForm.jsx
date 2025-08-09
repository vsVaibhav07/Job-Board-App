import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../contexts/ThemeContext";
import { toast } from "sonner";

const ApplyForm = () => {
  const { jobId } = useParams();
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resumeUrl: "" 
  });

  const [loading, setLoading] = useState(false); 

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resumeUrl) {
      toast.error("Please paste your resume link.");
      return;
    }

    setLoading(true); 

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/jobs/apply/${jobId}`,
        formData
      );

      if (res.status === 201) {
        setFormData({ name: "", email: "", resumeUrl: "" });
        toast.success("Application submitted successfully!");
        navigate("/");
      }
    } catch (err) {
      toast.error("Failed to submit application.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-lg p-8 rounded-lg shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Apply for Job</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className={`w-full mb-4 px-4 py-2 rounded border ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "border-gray-300"
          }`}
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className={`w-full mb-4 px-4 py-2 rounded border ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "border-gray-300"
          }`}
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="resumeUrl"
          placeholder="Paste your resume link here"
          className={`w-full mb-4 px-4 py-2 rounded border ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "border-gray-300"
          }`}
          value={formData.resumeUrl}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading} // ✅ Submitting के दौरान disable
          className={`w-full py-2 rounded transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default ApplyForm;

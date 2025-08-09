import React from "react";
import axios from "axios";
import { toast } from "sonner";

const Delete = ({ jobId, setGroupedApps }) => {
  const handleDeleteJob = async () => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Job deleted successfully");

      setGroupedApps((prev) => {
        const updated = { ...prev };
        delete updated[jobId];
        return updated;
      });
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job");
    }
  };

  return (
    <button
      onClick={handleDeleteJob}
      className="bg-gray-700 cursor-pointer hover:bg-gray-600 text-white px-4 py-2 text-sm rounded transition duration-200"
    >
      🗑️ Delete Job
    </button>
  );
};

export default Delete;

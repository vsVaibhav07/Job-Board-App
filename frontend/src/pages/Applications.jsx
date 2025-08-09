
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../contexts/ThemeContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaEdit,  } from "react-icons/fa";
import Delete from "../components/Delete";

const Applications = () => {
  const { darkMode } = useContext(ThemeContext);
  const [groupedApps, setGroupedApps] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/applications/getAll`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (Array.isArray(res.data)) {
          const grouped = {};
          res.data.forEach((app) => {
            const key = `${app.jobId?._id || "unknown"}`;
            if (!grouped[key]) {
              grouped[key] = {
                job: {
                  _id: app.jobId?._id || "unknown",
                  title: app.jobId?.title || "Untitled",
                  company: app.jobId?.company || "Unknown Company",
                  location: app.jobId?.location || "Unknown Location",
                },
                applications: [],
              };
            }
            grouped[key].applications.push(app);
          });
          setGroupedApps(grouped);
        } else {
          toast.error("Invalid response from server.");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error("Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const containerStyle = darkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-800";

  const cardStyle = darkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-800";

  const applicationStyle = darkMode
    ? "bg-gray-700 text-white"
    : "bg-gray-50 text-gray-800";

 
  const viewResume = (url) => {
    if (!url) return;
    window.open(url, "_blank");
  };


  const downloadResume = (url) => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "resume";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`min-h-screen p-8 ${containerStyle}`}>

      <nav className="flex items-start mb-8">
        <Link to="/" className="text-blue-500 text-2xl underline"> <FaArrowLeft/></Link>
      <h2 className="text-3xl font-bold mb-6 w-[96%] text-center">📄 Job Applications</h2>
      </nav>
      

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : Object.keys(groupedApps).length === 0 ? (
        <p className="text-center">No applications submitted yet.</p>
      ) : (
        <div className="space-y-10 max-w-4xl mx-auto">
          {Object.entries(groupedApps).map(([jobId, { job, applications }]) => (
            <div key={jobId} className={`rounded-lg shadow-md p-6 ${cardStyle}`}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-semibold">
                    {job.title} at {job.company}
                  </h3>
                  <p className="text-sm text-gray-400">{job.location}</p>
                </div>

                <Link to={`/jobs/edit/${job._id}`} className="flex items-center">
                  <button className="bg-gray-700 flex items-center justify-center gap-1 cursor-pointer hover:bg-gray-600 text-white px-4 py-2 text-sm rounded transition duration-200">
                    <FaEdit /> Edit Job
                  </button>
                </Link>

                <Delete jobId={job._id} setGroupedApps={setGroupedApps} />
              </div>

              <div className="space-y-4 mt-4">
                {applications.map((app) => (
                  <div
                    key={app._id}
                    className={`rounded-md p-4 border ${applicationStyle}`}
                  >
                    <p>
                      <strong>👤 Name:</strong> {app.name}
                    </p>
                    <p>
                      <strong>📧 Email:</strong> {app.email}
                    </p>
                    <p>
                      <strong>📎 Resume:</strong>
                      <span className="flex flex-col sm:flex-row gap-2 mt-1">
                        <button
                          onClick={() => viewResume(app.resumeUrl)}
                          className="text-blue-500 underline"
                        >
                          View Resume
                        </button>
                        <button
                          onClick={() => downloadResume(app.resumeUrl)}
                          className="text-green-500 underline"
                        >
                          ⬇ Download
                        </button>
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;

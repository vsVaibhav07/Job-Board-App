import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../contexts/SearchContext";
import { ThemeContext } from "../contexts/ThemeContext";
import JobCard from "./JobCard";

const JobList = () => {
  const { darkMode } = useContext(ThemeContext);
  const { searchTerm } = useContext(SearchContext);

  const [jobs, setJobs] = useState([]);
  const [companyFilter, setCompanyFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/jobs/all`
        );
        setJobs(response.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (companyFilter === "" || job.company === companyFilter) &&
      (roleFilter === "" || job.title === roleFilter)
    );
  });

  const companies = [...new Set(jobs.map((job) => job.company))];
  const roles = [...new Set(jobs.map((job) => job.title))];

  const themeClasses = darkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-900";

  return (
    <div className={`min-h-screen py-8 px-4 md:px-10 ${themeClasses}`}>
      {/* Filters */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Company Filter */}
        <div>
          <label className="block mb-2 font-semibold text-sm md:text-base">
            Filter by Company
          </label>
          <select
            className="w-full p-2 border rounded-lg focus:outline-none bg-white text-gray-800 shadow"
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
          >
            <option value="">All Companies</option>
            {companies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        {/* Role Filter */}
        <div>
          <label className="block mb-2 font-semibold text-sm md:text-base">
            Filter by Role
          </label>
          <select
            className="w-full p-2 border rounded-lg focus:outline-none bg-white text-gray-800 shadow"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

    
      <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No jobs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default JobList;

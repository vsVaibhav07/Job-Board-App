import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

export const getApplications = async (req, res) => {
  try {
    const recruiterId = req.user._id;

 
    const recruiterJobs = await Job.find({ recruiterId });


    const jobIds = recruiterJobs.map((job) => job._id);

 
    const applications = await Application.find({
      jobId: { $in: jobIds },
    }).populate("jobId", "title company location"); 

    res.status(200).json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Failed to fetch applications", error: err });
  }
};

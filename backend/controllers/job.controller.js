import mongoose from "mongoose";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";



export const createJob = async (req, res) => {
  try {
    const { title, company, location, description } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).json({
        message: "All fields (title, company, location, description) are required.",
      });
    }
    
    const recruiterId = req.user._id;
    const newJob = await Job.create({ title, company, location, description, recruiterId });

    return res.status(201).json({
      message: "Job created successfully.",
      job: newJob,
    });
  } catch (error) {
    console.error("Create Job Error:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Get Jobs Error:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};


export const getSingleJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Job ID." });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.error("Get Single Job Error:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};


export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, company, location, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Job ID." });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    job.title = title || job.title;
    job.company = company || job.company;
    job.location = location || job.location;
    job.description = description || job.description;

    await job.save();

    return res.status(200).json({
      message: "Job updated successfully.",
      job,
    });
  } catch (error) {
    console.error("Update Job Error:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};


export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Job ID." });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    await job.deleteOne();
    return res.status(200).json({ message: "Job deleted successfully." });
  } catch (error) {
    console.error("Delete Job Error:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};


export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { name, email, resumeUrl } = req.body;

 
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID." });
    }

    if (!name || !email || !resumeUrl) {
      return res.status(400).json({
        message: "Name, email, and resume link are required.",
      });
    }


    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    const application = await Application.create({
      jobId,
      name,
      email,
      resumeUrl, 
    });

    return res.status(201).json({
      message: "Application submitted successfully.",
      application,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
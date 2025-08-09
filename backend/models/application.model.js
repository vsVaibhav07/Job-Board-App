import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },

  name: String,
  email: String,
  resumeUrl: String,
}, { timestamps: true });

export const Application = mongoose.model("Application", applicationSchema);

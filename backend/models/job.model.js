import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: String,
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  company: String,
  location: String,
  description: String,
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);

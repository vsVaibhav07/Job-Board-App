import express from "express";
import {
  applyToJob,
  createJob,
  deleteJob,
  getAllJobs,
  getSingleJob,
  updateJob,
} from "../controllers/job.controller.js";
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();


router.post("/create", isAuthenticated, isAdmin("admin"), createJob);
router.delete("/delete/:id", isAuthenticated, isAdmin("admin"), deleteJob);
router.put("/update/:id", isAuthenticated, isAdmin("admin"), updateJob);
router.get("/all", getAllJobs);
router.get("/single/:id", getSingleJob);
router.post("/apply/:jobId", applyToJob);
router.delete("/:id", isAuthenticated, isAdmin("admin"), deleteJob);
router.put("/:id", isAuthenticated, isAdmin("admin"), updateJob);
router.get("/:id", isAuthenticated, getSingleJob);

export default router;

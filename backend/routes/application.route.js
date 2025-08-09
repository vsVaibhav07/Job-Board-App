import express from "express";
import { getApplications } from "../controllers/Applications.controller.js";
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();


router.get("/getAll", isAuthenticated, isAdmin("admin"), getApplications);

export default router;

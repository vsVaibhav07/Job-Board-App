import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";


import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URI;


app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


app.get("/health", (req, res) => {
  res.send("✅ Server is healthy");
});


app.get("/", (req, res) => {
  res.send("🚀 Welcome to the Job Board App API");
});


app.use("/api/users",userRoutes); 
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes); 


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

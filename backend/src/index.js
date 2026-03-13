import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./utils/dbutils.js";
import authRoute from "./route/authroute.js";
import bookRoute from "./route/bookroute.js";

// load environment variables from .env file
dotenv.config();

const app = express();

// middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// routes
app.use("/api/auth", authRoute);
app.use("/api/books", bookRoute);
 
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
    connectDB();
  });




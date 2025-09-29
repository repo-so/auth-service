import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"; //to get cookie data
import authRoutes from "./routes/authRoutes";
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  }));

app.use("/api/auth", authRoutes);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ Connected to MongoDB");

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // exit if cannot connect
  }
}

startServer();

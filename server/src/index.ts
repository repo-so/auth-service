import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"; //to get cookie data
import authRoutes from "./routes/authRoutes";

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


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

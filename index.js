import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db.js";
import Urlrouter from "./Routes.js";

const app = express();

connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/url", Urlrouter);

app.get("/", (req, res) => {
  res.status(200).json({ "message": "URL Shortener Backend is Running" });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

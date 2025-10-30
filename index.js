// const express = require("express");
// const fs = require("fs");
// const userRouter = require("./routes/user.route");
// const mongoose = require("mongoose");
// const todoRouter = require("./routes/todo.route");
// const cors = require("cors");
import express from "express";
import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import dotenv from "dotenv";

const app = express();
// console.log(app);
dotenv.config();

app.use(express.json());

//CORS ==> cross origin resorce share
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: "POST",
  })
);

//Endpoint
app.use("/users", userRouter);
app.use("/todos", todoRouter);
app.use("/auth", authRouter);

//wildcard
app.use(/(.*)/, (req, res) => {
  res.status(404).json({
    message: `This ulr ${req.originalUrl} not found in this API`,
  });
});
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(" MongoDB Error:", err);
  });

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started");
});



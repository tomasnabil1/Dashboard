import express from "express";
import { login, signup , resetPassword } from "../controller/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/resetPassword", resetPassword);

export default authRouter;

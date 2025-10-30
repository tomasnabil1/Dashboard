import express from "express";

import {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
} from "../controller/user.controller.js";
const userRouter = express.Router();



userRouter.get("/", getAllUsers);
userRouter.post("/", createUser);
userRouter.get("/:id", getUserById);
userRouter.patch("/:id", updateUserById);
userRouter.delete("/:id", deleteUserById);

export default userRouter;

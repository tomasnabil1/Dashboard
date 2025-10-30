// const express = require("express");
import express from "express";
import {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    getUserTodos,
} from "../controller/todo.controller.js";
import { protect } from "../middleware/auth.js";
const todoRouter = express.Router();

todoRouter.post("/", protect,createTodo);
todoRouter.get("/", getAllTodos);
todoRouter.get("/:id", getTodoById);
todoRouter.get("/user/:id", getUserTodos);
todoRouter.delete("/", deleteTodo);
todoRouter.patch("/:id", updateTodo);

export default todoRouter;

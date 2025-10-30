// const TodoModel = require("../models/todo.model");
import TodoModel from "../models/todo.model.js";


// create Todo
async function createTodo(req,res) {
    let {name, status, user} = req.body ;

    let todo = await TodoModel.create({
        name,
        status,
        user,
    });
    res.status(201).json({
        message:"Success",
        todo,
    });
}

// get All Todos
async function getAllTodos(req,res) {

    let todos = await TodoModel.find().populate(
        "user",
        "-password -_id -__v -age"
    );
    res.status(201).json({
        message:"Success",
        todos,
    });
}

// get by id
async function getTodoById(req,res) {
    let id = req.params.id;
    let todo = await TodoModel.findById(id).populate(
        "user",
        "-password -_id -__v -age"
    );
    res.status(201).json({
        message:"Sucess",
        todo,
    });
    
}
// get Users Todos
async function getUserTodos(req, res) {
  let userId = req.params.id;
  let todos = await TodoModel.find({ user: userId }).populate("user");
  res.status(200).json({
    message: "success",
    todos,
  });
}

// Update
async function updateTodo(req,res) {
    let id = req.params.id;
    let newTodo = await TodoModel.findByIdAndUpdate(id, req.body,{
        new:true,
    });
    res.status(201).json({
      message: "Updated",
      newTodo,
    });
}

// Delete By Id
async function deleteTodo(req,res) {
    let id = req.body.id;
    let todo = await TodoModel.findByIdAndDelete(id);

    res.status(201).json({
        message:"Deleted",
        todo,
    });

}




export {
    createTodo,
    getAllTodos,
    getTodoById,
    getUserTodos,
    updateTodo,
    deleteTodo,
};
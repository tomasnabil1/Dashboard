// const UserModel = require("../models/user.model");
 import UserModel from "../models/user.model.js";
// create user
async function createUser(req, res) {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json({
      message: "User created",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
}

// get all users
async function getAllUsers(req, res) {
  try {
    const users = await UserModel.find();
    res.status(200).json({
      message: "Users retrieved",
      users,
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving users", error: err.message });
  }
}

// get User by ID
async function getUserById(req, res) {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json({
      message: "User found",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error finding user", error: err.message });
  }
}

// update User by Id
async function updateUserById(req, res) {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "User updated",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
}

// delete User by id 
async function deleteUserById(req, res) {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "User deleted",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
}

// models export
export {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};

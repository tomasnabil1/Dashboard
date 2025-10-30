import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export async function signup(req, res) {
  const { username, email, password, age } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "You must provide username, email and password",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
    age,
  });

  res.status(201).json({
    message: "success",
    user,
  });
}

export async function login(req, res) {
  // Debug logs
  console.log("EMAIL:", req.body.email);
  console.log("PASSWORD:", req.body.password);

  const { email, password } = req.body;

  let user = await UserModel.findOne({ email });
  console.log("USER FROM DB:", user); // Print user data from DB

  if (!user) {
    return res.status(404).json({
      message: "invalid credentials - user not found",
    });
  }

  let match = await bcrypt.compare(password, user.password);
  console.log("PASSWORD MATCH:", match); // Check compare result

  if (!match) {
    return res.status(401).json({
      message: "invalid credentials - wrong password",
    });
  }

  let token = await jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWTSECRETKEY,
    {
      expiresIn: "30d",
    }
  );

  res.status(200).json({
    message: "success",
    token,
  });
}

export async function resetPassword(req, res) {
  try {
    const { email, newPassword } = req.body;

    // Check required fields
    if (!email || !newPassword) {
      return res.status(400).json({
        message: "Email and new password are required",
      });
    }

    // Find user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error",
    });
  }
}




 




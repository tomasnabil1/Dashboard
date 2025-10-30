import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  //   console.log(req.headers);
  let { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      messgae: "You are not authorized",
    });
  }

  let decode = await jwt.verify(authorization, process.env.JWTSECRETKEY);
  let user = await UserModel.findById(decode.id);
  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  //   console.log(decode);

  req.user = user;
  next();
};

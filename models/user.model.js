import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: [3 ,"Username must be at least 3 char"],
    required: true,
  },
  email: {
    type:String,
    unique: true,
    validate:{
      validator:function(value){
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message:"please enter a valid email"
    },
  },
  password:{
    type:String,
    minlength:[6, "please enter at least 6 char"],
  },
  age:Number,
});

const User = mongoose.model("User",userSchema);

export default User;

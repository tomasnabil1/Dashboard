// const mongoose = require("mongoose");
import mongoose  from "mongoose";

const todoSchema = new mongoose.Schema(

    {
        name: {
            type: String,
            minlength: [3, "min length must be grt 3 char"]
        },
       
        status:{
        type:String,
        enum:["todo","inProgress","Completed"],
        default:"todo"
        },

    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
},
{ timestamps:true }
);

const TodoModel = mongoose.model("Todo",todoSchema);
export default TodoModel;
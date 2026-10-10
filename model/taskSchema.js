import mongoose from "mongoose";
const TaskSchema= new mongoose.Schema({
    title:{type:String,required:true},
    description:String,
    status:{ type:String,enum:["pending","in progress","completed"],
        default:"pending"
    },
    dueDate:Date,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    required:true }
},
{timestamps:true});
export const Task = mongoose.model("Task", TaskSchema);
//table task should be put the data from controllers

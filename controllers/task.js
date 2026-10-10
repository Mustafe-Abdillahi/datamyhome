import {Task} from "../model/taskSchema.js";
// create new task by this formula

export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};
// get all tasks createdBy:req.user._id from database through
export const getAllTasks = async (req, res, next) => {
  const tasks = await Task.find({ createdBy: req.user._id });
  res.status(200).json(tasks);
};
//get one task
export const getTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  res.status(200).json(task);
};
//
export const updateTask = async (req, res, next) => {
  const updatedTask = await Task.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    req.body,
    { new: true },
  );
  if (!updatedTask) {
    return res.status(404).json({ message: "task not found}" });
  }
  res.status(200).json(updatedTask);
};
//delete task
export const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "task not found" });
    }
    res.status(201).json({ message: "task deleted successfully" });
  } catch (err) {
    next(err);
  }
};

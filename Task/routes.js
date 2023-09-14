const express = require("express");
const Team = require("../Models/Team");
const Project = require("../Models/Project");
const Employee = require("../Models/Employee");
const Task = require("../Models/Task");
const TaskRouter = express.Router();

TaskRouter.post("/addTask", async (req, res) => {
  try {
    const team = await Team.findOne({ _id: req.body.team });
    const project = await Project.findOne({ domainName: req.body.project });
    const employee = await Employee.findOne({ userID: req.body.employee });
    const task = new Task({
      team: team._id,
      project: project._id,
      employee: employee._id,
      task: req.body.task,
      deadline: new Date(req.body.deadline),
      description: req.body.description,
      statusDescription: "",
    });
    await task.save();
    res.status(200).json({ message: "Task has been assigned Successfully" });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

TaskRouter.put("/updateTask/:id", async (req, res) => {
  try {
    const data = {
      status: req.body.status,
      statusDescription: req.body.statusDescription,
    };
    const task = await Task.findByIdAndUpdate(req.params.id, data);
    if (task != null) {
      res.status(200).json({ message: "Status has been updated successfully" });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

TaskRouter.delete("/deleteTask/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (task != null) {
      res
        .status(200)
        .json({ message: "Project has been deleted Successfully" });
    } else {
      res.status(404).json({ message: "Task not Found" });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

TaskRouter.get("/getTask/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task != null) {
      res.status(200).json({
        _id: task._id,
        team: await Team.findOne({ _id: task.team }),
        project: await Project.findOne({ _id: task.project }),
        employee: await Employee.findOne({ _id: task.employee }),
        task: task.task,
        deadline: task.deadline,
        description: task.description,
        status: task.status,
        statusDescription: task.statusDescription,
      });
    } else {
      res.status(404).json({ message: "Task not Found" });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

TaskRouter.post("/getTasks", async (req, res) => {
  try {
    console.log(req.body);
    const team = await Team.findOne({ _id: req.body.team });
    console.log(team);

    const project = await Project.findOne({ domainName: req.body.project });
    console.log(project);
    const tasks = await Task.find({ team: team._id, project: project._id });
    console.log(tasks);

    allTasks = [];
    for (task of tasks) {
      allTasks.push({
        _id: task._id,
        team: team.teamName,
        project: project,
        employee: await Employee.findOne({ _id: task.employee }),
        task: task.task,
        deadline: task.deadline,
        description: task.description,
        status: task.status,
        statusDescription: task.statusDescription,
      });
    }
    console.log("all tasks", allTasks);
    res.status(200).json(allTasks);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

TaskRouter.post("/getEmployeeTasks", async (req, res) => {
  try {
    const team = await Team.findOne({ _id: req.body.team });
    const project = await Project.findOne({ domainName: req.body.project });
    const employee = await Employee.findOne({ userID: req.body.employee });
    const tasks = await Task.find({
      team: team._id,
      project: project._id,
      employee: employee._id,
    });
    console.log("All Tasks of Employee", tasks);
    allTasks = [];
    for (task of tasks) {
      allTasks.push({
        _id: task._id,
        team: team.teamName,
        project: project,
        employee: employee,
        task: task.task,
        deadline: task.deadline,
        description: task.description,
        status: task.status,
        statusDescription: task.statusDescription,
      });
    }
    res.status(200).json(allTasks);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = TaskRouter;

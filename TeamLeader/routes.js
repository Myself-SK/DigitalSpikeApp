const express = require("express");
const TeamLeader = require("../Models/TeamLeader");
const Team = require("../Models/Team");
const Project = require("../Models/Project");
const Employee = require("../Models/Employee");
const TLRouter = express.Router();

TLRouter.get("/getAll", async (req, res) => {
  const employess = await TeamLeader.find();
  res.status(200).json(employess);
});

TLRouter.get("/getAllTeams/:id", async (req, res) => {
  try {
    console.log(req.params);
    const teamLead = await TeamLeader.findOne({ userID: req.params.id });
    console.log(teamLead);
    const teams = await Team.find({ teamLeader: teamLead._id });
    console.log(teams);
    allTeams = [];
    for (team of teams) {
      allTeams.push(team);
    }
    res.status(200).json(allTeams);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

TLRouter.get("/getAllProjects/:id", async (req, res) => {
  try {
    console.log(req.params);
    const teams = await Team.findById(req.params.id);
    allProjects = [];
    for (proj of teams.projects) {
      allProjects.push(await Project.findById(proj));
    }

    res.status(200).json(allProjects);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

TLRouter.get("/getAllEmployees/:id", async (req, res) => {
  try {
    console.log(req.params);
    const teams = await Team.findById(req.params.id);
    allEmployees = [];
    for (emp of teams.teamMembers) {
      allEmployees.push(await Employee.findById(emp));
    }

    res.status(200).json(allEmployees);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

TLRouter.post("/createTL", async (req, res) => {
  try {
    const user = new TeamLeader({
      userID: req.body.userID,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      salary: req.body.salary,
      designation: req.body.designation,
    });
    res.status(200).json(await user.save());
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

TLRouter.get("/getTL/:id", async (req, res) => {
  try {
    const data = await TeamLeader.findById(req.params.id);
    console.log(data._id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

TLRouter.put("/updateTL/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const user = await TeamLeader.findOneAndUpdate({ _id: id }, req.body);
    const data = await TeamLeader.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

TLRouter.delete("/deleteTL/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await TeamLeader.findByIdAndDelete(id);
    console.log(data);
    res.send(`Document with ${data.userID} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = TLRouter;

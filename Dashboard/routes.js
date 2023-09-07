const express = require("express");
const Client = require("../Models/Client");
const Project = require("../Models/Project");
const Team = require("../Models/Team");
const TeamLeader = require("../Models/TeamLeader");
const Employee = require("../Models/Employee");
const User = require("../Models/User");
const dashRouter = express.Router();

dashRouter.get("/:id", async (req, res) => {
  try {
    var empData = await Employee.findById(req.params.id);
    var adminData = await User.findById(req.params.id);
    var tlData = await TeamLeader.findById(req.params.id);
    console.log(empData, adminData, tlData);
    if (adminData != null) {
      const clientData = (await Client.find()).length;
      const projectData = (await Project.find()).length;
      const employeData = (await Employee.find()).length;
      const teamData = (await Team.find()).length;
      res.status(200).json({
        clientCount: clientData,
        projectCount: projectData,
        employeCount: employeData,
        teamCount: teamData,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = dashRouter;

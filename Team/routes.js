const express = require("express");
const Team = require("../Models/Team");
const Employee = require("../Models/Employee");
const Project = require("../Models/Project");
const TeamLeader = require("../Models/TeamLeader");

const TeamRouter = express.Router();

TeamRouter.post("/createTeam", async (req, res) => {
  try {
    empList = [];
    proList = [];

    const employee = await Employee.find({
      userID__in: req.params.teamMembers,
    });
    console.log(employee);
    for (emp of employee) {
      empList.push(emp._id);
    }
    const project = await Project.find({
      domainName__in: req.body.project,
    });

    const teamLead = await TeamLeader.findOne({
      userID: req.body.teamLeader,
    });
    console.log(empList);

    for (pro of project) {
      proList.push(pro._id);
    }
    const team = new Team({
      teamName: req.body.teamName,
      teamLeader: teamLead._id,
      teamMembers: empList,
      projects: proList,
    });
    console.log(team);
    await team.save();
    for (proID of proList) {
      const proj = await Project.findOneAndUpdate(
        {
          _id: proID,
        },
        {
          status: "allocated",
        }
      );
    }
    res.status(200).json({ message: "Team has been created successfully" });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

TeamRouter.delete("/deleteTeam/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Team.findByIdAndDelete(id);
    console.log(data);
    res.send(`Document with ${data.teamName} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = TeamRouter;

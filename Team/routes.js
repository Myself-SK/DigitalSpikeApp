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

TeamRouter.get("/getAll", async (req, res) => {
  try {
    const teams = await Team.find();
    allTeam = [];
    for (const team of teams) {
      empList = [];
      for (emp in team.teamMembers) {
        console.log(emp);
        const empl = await Employee.findById(team.teamMembers[emp]);
        empList.push(empl);
      }
      proList = [];
      for (pro in team.projects) {
        const proj = await Project.findById(team.projects[pro]);
        proList.push(proj);
      }
      const teamLead = await TeamLeader.findById(team.teamLeader);
      const teamData = {
        teamName: team.teamName,
        teamLeader: teamLead,
        teamMembers: empList,
        projects: proList,
        _id: team._id,
      };
      allTeam.push(teamData);
    }
    res.status(200).json(allTeam);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

TeamRouter.get("/getTeam/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    empList = [];
    for (emp in team.teamMembers) {
      console.log(emp);
      const empl = await Employee.findById(team.teamMembers[emp]);
      empList.push(empl);
    }
    proList = [];
    for (pro in team.projects) {
      const proj = await Project.findById(team.projects[pro]);
      proList.push(proj);
    }
    const teamLead = await TeamLeader.findById(team.teamLeader);
    const teamData = {
      teamName: team.teamName,
      teamLeader: teamLead,
      teamMembers: empList,
      projects: proList,
      _id: team._id,
    };
    console.log(teamData);
    res.json(teamData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

TeamRouter.delete("/deleteTeam/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Team.findById(id);
    console.log(data.projects);
    for (pro of data.projects) {
      const pr = await Project.findById(pro);
      if (pr.status != "completed" || pr.status != "Completed") {
        const proj = await Project.findOneAndUpdate(
          {
            _id: pro,
          },
          {
            status: "pending",
          }
        );
      }
    }
    const newData = await Team.findByIdAndDelete(id);
    res.send(`Document with ${data.teamName} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = TeamRouter;

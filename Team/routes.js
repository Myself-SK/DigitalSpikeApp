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
    for (emp of req.body.teamMembers) {
      const employee = await Employee.findOne({
        userID: emp,
      });
      empList.push(employee._id);
    }
    for (pro of req.body.projects) {
      const proj = await Project.findOne({
        domainName: pro,
      });
      proList.push(proj._id);
    }

    console.log(proList);

    console.log(empList);
    const teamLead = await TeamLeader.findOne({
      userID: req.body.teamLeader,
    });
    const team = new Team({
      teamName: req.body.teamName,
      teamLeader: teamLead._id,
      teamMembers: empList,
      projects: proList,
    });
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

TeamRouter.post("/addProject/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    proList = [];
    for (pro of team.projects) {
      proList.push(pro);
    }
    for (pro of req.body.projects) {
      const proj = await Project.findOne({
        domainName: pro,
      });
      proList.push(proj._id);
    }
    const updatedTeam = await Team.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        projects: proList,
      }
    );
    res.status(200).json({ message: "Projects added Successfully" });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

TeamRouter.post("/removeProject/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    proList = [];
    for (pro of team.projects) {
      const proj = await Project.findById(pro);
      for (proName of req.body.projects) {
        if (proName != proj.domainName) {
          proList.push(proj._id);
        }
      }
    }
    console.log(proList);
    const updatedTeam = await Team.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        projects: proList,
      }
    );
    res.status(200).json({ message: "Projects removed Successfully" });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

TeamRouter.post("/addEmployee/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    empList = [];
    for (emp of team.teamMembers) {
      empList.push(emp);
    }
    for (emp of req.body.teamMembers) {
      const empl = await Employee.findOne({
        userID: emp,
      });
      empList.push(empl._id);
    }
    const updatedTeam = await Team.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        teamMembers: empList,
      }
    );
    res.status(200).json({ message: "Employees added Successfully" });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

TeamRouter.post("/removeEmployee/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    empList = [];
    for (emp of team.teamMembers) {
      const empl = await Employee.findById(emp);
      for (empName of req.body.teamMembers) {
        if (empName != empl.userID) {
          empList.push(empl._id);
        }
      }
    }
    console.log(empList);
    const updatedTeam = await Team.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        teamMembers: empList,
      }
    );
    res.status(200).json({ message: "Employees removed Successfully" });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
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

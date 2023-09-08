const express = require("express");
const Employee = require("../Models/Employee");
const TeamLeader = require("../Models/TeamLeader");
const Leave = require("../Models/Leave");
const LeaveRouter = express.Router();

LeaveRouter.post("/applyLeave", async (req, res) => {
  try {
    console.log(req.body);
    const user = await Employee.findOne({ userID: req.body.userID });
    const teamLead = await TeamLeader.findOne({ userID: req.body.userID });
    if (user) {
      const leave = new Leave({
        userID: user._id,
        fromDate: new Date(req.body.fromDate),
        toDate: new Date(req.body.toDate),
        reason: req.body.reason,
        description: req.body.description,
      });
      console.log(leave);
      await leave.save();
      res.status(200).json({ message: "Leave Request Submitted Successfully" });
    } else if (teamLead) {
      const leave = new Leave({
        userID: teamLead._id,
        fromData: req.body.fromData,
        toData: req.body.toData,
        reason: req.body.reason,
        description: req.body.description,
      });
      await leave.save();
      res.status(200).json({ message: "Leave Request Submitted Successfully" });
    } else {
      res.status(404).json({ message: "Invalid EmployeeID" });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

LeaveRouter.get("/getAll", async (req, res) => {
  try {
    const leaves = await Leave.find();
    allLeaves = [];
    for (const leave of leaves) {
      const user = await Employee.findById(leave.userID);
      const teamlead = await TeamLeader.findById(leave.userID);
      if (user != null) {
        const leav = {
          _id: leave._id,
          userID: user,
          fromDate: leave.fromDate,
          toDate: leave.toDate,
          reason: leave.reason,
          description: leave.description,
          status: leave.status,
        };
        allLeaves.push(leav);
      } else if (teamlead != null) {
        const leav = {
          _id: leave._id,
          userID: teamlead,
          fromDate: leave.fromDate,
          toDate: leave.toDate,
          reason: leave.reason,
          description: leave.description,
          status: leave.status,
        };
        allLeaves.push(leav);
      }
    }
    res.status(200).json(allLeaves);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

LeaveRouter.put("updateLeave/:id", async (req, res) => {
    
});

module.exports = LeaveRouter;

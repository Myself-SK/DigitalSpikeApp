const express = require("express");
const Employee = require("../Models/Employee");
const TeamLeader = require("../Models/TeamLeader");
const Leave = require("../Models/Leave");
const LeaveRouter = express.Router();

LeaveRouter.post("/applyLeave", async (req, res) => {
  try {
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

LeaveRouter.get("/getAll/:id", async (req, res) => {
  try {
    const user = await Employee.findOne({ userID: req.params.id });
    const teamLead = await TeamLeader.findOne({ userID: req.params.id });
    if (user != null) {
      allLeaves = [];
      const leaves = await Leave.find({ userID: user.id });
      for (leave of leaves) {
        allLeaves.push({
          _id: leave._id,
          userID: user,
          fromDate: leave.fromDate,
          toDate: leave.toDate,
          reason: leave.reason,
          description: leave.description,
          status: leave.status,
        });
      }
      res.status(200).json(allLeaves);
    } else if (teamLead != null) {
      allLeaves = [];
      const leaves = await Leave.find({ userID: teamLead.id });
      for (leave of leaves) {
        allLeaves.push({
          _id: leave._id,
          userID: teamLead,
          fromDate: leave.fromDate,
          toDate: leave.toDate,
          reason: leave.reason,
          description: leave.description,
          status: leave.status,
        });
      }
      res.status(200).json(allLeaves);
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

LeaveRouter.put("/updateLeave/:id", async (req, res) => {
  try {
    const leave = await Leave.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: req.body.status,
      }
    );
    console.log(leave);
    res.status(200).json({ message: "Leave Status Updated Successfully" });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

LeaveRouter.get("/getLeave/:id", async (req, res) => {
  try {
    const leaves = await Leave.findById(req.params.id);
    const user = await Employee.findOne({ _id: leaves.userID });
    const teamLead = await TeamLeader.findOne({ _id: leaves.userID });
    if (user != null) {
      res.status(200).json({
        _id: req.params.id,
        userID: user,
        fromDate: leaves.fromDate,
        toDate: leaves.toDate,
        reason: leaves.reason,
        description: leaves.description,
        status: leaves.status,
      });
    } else if (teamLead != null) {
      res.status(200).json({
        _id: req.params.id,
        userID: teamLead,
        fromDate: leaves.fromDate,
        toDate: leaves.toDate,
        reason: leaves.reason,
        description: leaves.description,
        status: leaves.status,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = LeaveRouter;

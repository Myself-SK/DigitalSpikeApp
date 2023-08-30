const express = require("express");
const TeamLeader = require("../Models/TeamLeader");
const TLRouter = express.Router();

TLRouter.get("/getAll", async (req, res) => {
  const employess = await TeamLeader.find();
  res.status(200).json(employess);
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

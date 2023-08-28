const express = require("express");
const Employee = require("../Models/Employee");
const EmpRouter = express.Router();

EmpRouter.get("/getAll", async (req, res) => {
  const employess = await Employee.find();
  res.status(200).json(employess);
});

EmpRouter.post("/createEmployee", async (req, res) => {
  try {
    const user = new Employee({
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

EmpRouter.get("/getEmployee/:id", async (req, res) => {
  try {
    const data = await Employee.findById(req.params.id);
    console.log(data._id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

EmpRouter.put("/updateEmployee/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const user = await Employee.findOneAndUpdate({ _id: id }, req.body);
    const data = await Employee.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

EmpRouter.delete("/deleteEmployee/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Employee.findByIdAndDelete(id);
    console.log(data);
    res.send(`Document with ${data.userID} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = EmpRouter;

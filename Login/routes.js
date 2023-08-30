const express = require("express");
const Employee = require("../Models/Employee");
const User = require("../Models/User");
const TeamLeader = require("../Models/TeamLeader");
const bcrypt = require("bcrypt");

const LoginRouter = express.Router();

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

LoginRouter.post("/login", async (req, res) => {
  try {
    var empData = await Employee.findOne({ userID: req.body.userID });
    var adminData = await User.findOne({ userID: req.body.userID });
    var tlData = await TeamLeader.findOne({ userID: req.body.userID });
    if (empData != null) {
      const matched = await verifyPassword(req.body.password, empData.password);
      console.log(matched);
      if (await verifyPassword(req.body.password, empData.password)) {
        res.status(200).json({
          message: "Login Successfull",
          type: "Employee",
          adminData: empData,
        });
      } else {
        res.status(401).json({
          message: "Invalid Credentials",
        });
      }
    } else if (adminData != null) {
      const matched = await verifyPassword(
        req.body.password,
        adminData.password
      );
      console.log(matched);
      if (await verifyPassword(req.body.password, adminData.password)) {
        res.status(200).json({
          message: "Login Successfull",
          type: "Admin",
          adminData: adminData,
        });
      } else {
        res.status(401).json({
          message: "Invalid Credentials",
        });
      }
    } else if (tlData != null) {
      console.log(tlData);
      const matched = await verifyPassword(req.body.password, tlData.password);
      console.log(matched);
      if (await verifyPassword(req.body.password, tlData.password)) {
        res.status(200).json({
          message: "Login Successfull",
          type: "TeamLeader",
          adminData: tlData,
        });
      } else {
        res.status(401).json({
          message: "Invalid Credentials",
        });
      }
    } else {
      res.status(400).json({
        message: "User Not Found",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = LoginRouter;

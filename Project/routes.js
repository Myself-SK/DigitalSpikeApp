const express = require("express");
const Project = require("../Models/Project");
const Client = require("../Models/Client");
const Market = require("../Models/Marketting");
const ProRouter = express.Router();

ProRouter.get("/getAll", async (req, res) => {
  try {
    const projects = await Project.find();
    allProjects = [];
    for (const project of projects) {
      var marketDetails = await Market.findOne({ project: project._id });

      const cliData = await Client.findById(project.clientName);
      const updatedData = {
        _id: project._id,
        clientName: cliData,
        orgName: project.orgName,
        category: project.category,
        domainName: project.domainName,
        startDate: project.startDate,
        renewalDate: project.renewalDate,
        hostingType: project.hostingType,
        domainCharge: project.domainCharge,
        hostingCharge: project.hostingCharge,
        serviceCharge: project.serviceCharge,
        status: project.status,
        credentials: marketDetails.credentials,
      };
      allProjects.push(updatedData);
    }
    res.status(200).json(allProjects);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

ProRouter.get("/ProjectStatus/:status", async (req, res) => {
  try {
    const projects = await Project.find({ status: req.params.status });
    allProjects = [];
    for (const project of projects) {
      var marketDetails = await Market.findOne({ project: project._id });
      const cliData = await Client.findById(project.clientName);
      const updatedData = {
        _id: project._id,
        clientName: cliData,
        orgName: project.orgName,
        category: project.category,
        domainName: project.domainName,
        startDate: project.startDate,
        renewalDate: project.renewalDate,
        hostingType: project.hostingType,
        domainCharge: project.domainCharge,
        hostingCharge: project.hostingCharge,
        serviceCharge: project.serviceCharge,
        status: project.status,
        credentials: marketDetails.credentials,
      };
      allProjects.push(updatedData);
    }
    res.status(200).json(allProjects);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

ProRouter.post("/createProject", async (req, res) => {
  try {
    const cliData = await Client.findOne({ clientName: req.body.clientName });
    if (cliData != null) {
      const user = new Project({
        clientName: cliData._id,
        orgName: req.body.orgName,
        category: req.body.category,
        domainName: req.body.domainName,
        startDate: new Date(req.body.startDate),
        renewalDate: new Date(req.body.renewalDate),
        hostingType: req.body.hostingType,
        domainCharge: req.body.domainCharge,
        hostingCharge: req.body.hostingCharge,
        serviceCharge: req.body.serviceCharge,
      });
      await user.save();
      console.log("Project Created");
      const data = await Project.findOne({ domainName: req.body.domainName });
      if (data != null) {
        const market = new Market({
          project: data._id,
          credentials: req.body.credentials,
        });
        await market.save();
      } else {
        res.status(404).json({
          message: "Project not Found",
        });
      }

      res
        .status(200)
        .json({ message: "Project has been created successfully" });
    } else {
      res.status(404).json({
        message: "Client not Found",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

ProRouter.get("/getProject/:id", async (req, res) => {
  try {
    var data = await Project.findById(req.params.id);
    var marketDetails = await Market.findOne({ project: req.params.id });
    console.log(marketDetails);
    const cliData = await Client.findById(data.clientName);
    const updatedData = {
      _id: data._id,
      clientName: cliData,
      orgName: data.orgName,
      category: data.category,
      domainName: data.domainName,
      startDate: data.startDate,
      renewalDate: data.renewalDate,
      hostingType: data.hostingType,
      domainCharge: data.domainCharge,
      hostingCharge: data.hostingCharge,
      serviceCharge: data.serviceCharge,
      status: data.status,
      credentials: marketDetails.credentials,
    };
    res.json(updatedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

ProRouter.put("/updateProject/:id", async (req, res) => {
  try {
    const id = req.params.id;
    updatedData = req.body;
    credentialsDetails = updatedData.credentials;

    const cliData = await Client.findOne({ clientName: req.body.clientName });
    if (cliData != null) {
      updatedData.clientName = cliData._id;
      const user = await Project.findOneAndUpdate({ _id: id }, updatedData);
      var market = await Market.findOne({ project: req.params.id });
      var updateMarket = await Market.findByIdAndUpdate(
        { _id: market._id },
        {
          project: user._id,
          credentials: credentialsDetails,
        }
      );
      if (user != null && market != null) {
        res.status(200).json({ message: "Project Updated Successfully" });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

ProRouter.delete("/deleteProject/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Project.findByIdAndDelete(id);
    console.log(data);
    const market = await Market.findOneAndDelete({ project: req.params.id });
    console.log(market);
    res.send(`Document with ${data.domainName} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = ProRouter;

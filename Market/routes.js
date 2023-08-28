const express = require("express");
const Market = require("../Models/Marketting");
const Project = require("../Models/Project");
const MarketRouter = express.Router();

MarketRouter.post("/createMarket", async (req, res) => {
  try {
    console.log(req.body);
    const data = await Project.findOne({ domainName: req.body.project });
    if (data != null) {
      const market = new Market({
        project: data._id,
        credentials: req.body.credentials,
      });
      res.status(200).json(await market.save());
    } else {
      res.status(404).json({
        message: "Project not Found",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

MarketRouter.put("/updateMarket/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const projectData = await Project.findOne({ domainName: req.body.project });
    if (projectData != null) {
      console.log(req.body);
      const user = await Market.findOneAndUpdate({ _id: id }, req.body);
      const data = await Market.findById(req.params.id);
      res.json(data);
    } else {
      res.status(404).json({ message: "Project Not Found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = MarketRouter;

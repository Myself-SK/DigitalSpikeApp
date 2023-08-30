require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const mongoData = process.env.DATABASE_NAME;
mongoose.connect(mongoData);
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("connected", () => {
  console.log("Connected");
});

const app = express();
app.use(express.json());
const homeRoutes = require("./User/routes");
const projectRoutes = require("./Project/routes");
const employeeRoutes = require("./Employee/routes");
const cliRoutes = require("./Client/routes");
const loginRoutes = require("./Login/routes");
const marketRoutes = require("./Market/routes");
const tlRoutes = require("./TeamLeader/routes");

app.use("/admin", homeRoutes);
app.use("/project", projectRoutes);
app.use("/employee", employeeRoutes);
app.use("/client", cliRoutes);
app.use("/market", marketRoutes);
app.use("/tl", tlRoutes);
app.use("", loginRoutes);

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});

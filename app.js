const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const SyResult = require("./schema/studentSchema.js");
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//connect to database
async function connectDataBase() {
  await mongoose.connect("mongodb://127.0.0.1:27017/result");
  console.log("DataBase Connected");
}
connectDataBase().catch((err) =>
  console.log("Find Error While Connecting DataBase: ", err)
);
// Show All Results
app.get("/", async (req, res) => {
  const SyResultData = await SyResult.find();
  res.render("index", { SyResultData });
});
//Show Single Result
app.get("/oneResult/:id", async (req, res) => {
  const { id } = req.params;
  const data = await SyResult.findById(id);
  res.render("oneResult", { data });
});

// Add New Result
app.get("/newResult", (req, res) => {
  res.render("new");
});
// Collect Data
app.post("/addResult", async (req, res) => {
  const newdata = req.body.student;
  await SyResult(newdata).save();
  res.redirect("/");
});

// edit data
app.get("/editResult/:id", async (req, res) => {
  const { id } = req.params;
  const data = await SyResult.findById(id);
  res.render("edit", { data });
});
// save change result
app.put("/saveResult/:id", async (req, res) => {
  const { id } = req.params;
  await SyResult.findByIdAndUpdate(id, { ...req.body.student });
  res.redirect("/");
});

// delete result
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await SyResult.findByIdAndDelete(id);
  res.redirect("/");
});

app.listen(port, () => console.log("Server runnig on port " + port));

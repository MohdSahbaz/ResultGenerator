const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
  name: String,
  rn: Number,
  std: String,
  cgpa: Number,
  result: String,
});

const SyResult = mongoose.model("SyResult", studentsSchema);

module.exports = SyResult;
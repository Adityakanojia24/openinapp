const mongoose = require("mongoose");
const SubTaskModel = mongoose.Schema(
  {
    task_id: { type: String },
    status: { type: Number},
  },
  { timeStamps: true }
);

const SubtaskSchema = mongoose.model("login", SubTaskModel);
module.exports = SubtaskSchema;
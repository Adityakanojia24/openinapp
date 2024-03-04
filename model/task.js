const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const TaskModel = mongoose.Schema(
  {
    title: { type: String, require: true, trim: true },
    description: { type: String, require: true, trim: true },
    due_date: { type: String, require: true, trim: true },
    id: { type: Number, require: true,  },
    status:String
  },
  { timeStamps: true }
);

const TaskSchema = mongoose.model("tasks", TaskModel);
module.exports = TaskSchema;
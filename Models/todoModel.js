const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Todo must have a title"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: [true, "Todo belongs to an user"],
  },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  done: { type: Boolean, required: true, default: false }
});

const Todo = mongoose.model("Todo", schema);

module.exports = Todo;

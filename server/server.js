const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const todoRouter = require("./routes/todoRouter");
mongoose.connect("mongodb://127.0.0.1:27017/todo");

const app = express();

// todoRouter
app.use("/todos", todoRouter);
app.get("/", (req, res) => {
  res.json({ number: 20 });
});

// static
app.use(express.static(path.resolve(__dirname, "../src")));

// http server listening on 8888
app.listen(8888, () => {
  console.log(`node server is running on port:8888`);
});

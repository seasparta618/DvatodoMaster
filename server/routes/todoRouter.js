const express = require("express");
const formidable = require("formidable");
const todoRouter = express.Router();
const Todo = require("../models/Todo");

// read
todoRouter.get("/", (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      console.error(err);
    } else {
      res.json({ code: 0, todos }).end();
    }
  });
});

// create
todoRouter.post("/", (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields) => {
    const { title } = fields;
    Todo.findOne({ title }, (err, todo) => {
      if (err) {
        console.error(err);
      } else {
        console.log(todo);
        if (!todo) {
          Todo.create({ title }, (err, todo) => {
            res.json({ code: 0, todo });
          });
        } else {
          res.json({ code: 1, msg: "already existed" });
        }
      }
    });
  });
});
// delete
todoRouter.delete("/:_id", (req, res) => {
  let _id = req.params._id;
  Todo.findByIdAndRemove({ _id }, (err, todo) => {
    res.json({ code: 0, _id: todo._id }).end();
  });
});

// update
todoRouter.patch("/:_id", (req, res) => {
  let _id = req.params._id;
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields) => {
    const { k, v } = fields;
    Todo.findByIdAndUpdate({ _id }, { $set: { [k]: v } }, (err, todo) => {
      if (err) {
        console.error(err);
      } else {
        res.json({ code: 0, _id: todo._id });
      }
    });
  });
});

module.exports = todoRouter;

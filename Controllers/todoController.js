const Todo = require("../Models/todoModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.setUserId = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};

exports.createTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      todo,
    },
  });
});

exports.getTodos = catchAsync(async (req, res, next) => {
  const user = req.user.id;
  const todo = await Todo.find({ user });
  res.status(200).json({
    status: "success",
    data: todo,
  });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!todo) {
    return next(new AppError("Can't find todo with that id", 400));
  }
  res.status(200).json({
    status: "success",
    data: {
      todo,
    },
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) {
    return next(new AppError("Can't find todo with that id", 400));
  }
  res.status(200).json({
    status: "success",
    message: "Todo removed",
  });
});

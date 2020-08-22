const express = require("express");
const router = express.Router();
const todoController = require("../Controllers/todoController");
const authController = require("../Controllers/authController");

router.use(authController.protect);

router
  .route("/")
  .get(todoController.getTodos)
  .post(todoController.setUserId, todoController.createTodo);

router
  .route("/:id")
  .patch(todoController.updateTodo)
  .delete(todoController.deleteTodo);

module.exports = router;

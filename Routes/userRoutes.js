const express = require("express");
const router = express.Router();

const userController = require("../Controllers/authController");
const { route } = require("./todoRoutes");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

module.exports = router;

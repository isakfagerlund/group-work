const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.get("/", storeController.homePage);
router.get("/add", storeController.addStore);

router.get("/login", userController.loginForm);
router.get("/register", userController.registerForm);

// 1. Validate the registrarion data
// 2. register the user
// 3. log user in

router.post(
  "/register",
  userController.validateRegister,
  userController.register,
  authController.login
);

module.exports = router;

const { catchErrors } = require("../handlers/errorHandlers");

const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.get("/", storeController.homePage);
router.get("/add", authController.isLoggedIn, storeController.addStore);

router.get("/login", userController.loginForm);
router.post("/login", userController.validateEmail, authController.login);
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

router.get("/logout", authController.logout);

router.get("/account", authController.isLoggedIn, userController.account);
router.post("/account", catchErrors(userController.updateAccount));
router.post(
  "/account/forgot",
  userController.validateEmail,
  catchErrors(authController.forgot)
);
router.get("/account/reset/:token", catchErrors(authController.reset));
router.post(
  "/account/reset/:token",
  authController.confirmedPasswords,
  catchErrors(authController.update)
);

module.exports = router;

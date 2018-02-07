const { catchErrors } = require("../handlers/errorHandlers");
const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.get("/", catchErrors(storeController.getStores));
router.get("/stores", catchErrors(storeController.getStores));
router.get("/add", authController.isLoggedIn, storeController.addStore);
router.post("/add", catchErrors(storeController.createStore));
router.post("/add/:id", catchErrors(storeController.updateStore));
router.get("/stores/:id/edit", catchErrors(storeController.editStore));

router.get("/login", userController.loginForm);
router.post("/login", userController.validateEmail, authController.login);
router.get("/register", userController.registerForm);

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

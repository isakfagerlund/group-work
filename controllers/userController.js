const mongoose = require("mongoose");
const User = mongoose.model("User");
const Documents = mongoose.model("Documents");
const promisify = require("es6-promisify");

exports.loginForm = (req, res) => {
  res.render("login", {
    title: "Login"
  });
};

exports.registerForm = (req, res) => {
  res.render("register", {
    title: "Create your account"
  });
};

exports.forgotForm = (req, res) => {
  res.render("forgot", {
    title: "Forgot Password"
  });
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody("name");
  req.checkBody("name", "You must supply a name!").notEmpty();
  req.checkBody("email", "That Email is not valid!").isEmail();
  req.sanitizeBody("email").normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody("password", "Password Cannot be Blank!").notEmpty();
  req
    .checkBody("password-confirm", "Confirmed Password cannot be blank!")
    .notEmpty();
  req
    .checkBody("password-confirm", "Oops! Your password do not match")
    .equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash("error", errors.map(err => err.msg));
    res.render("register", {
      title: "Register",
      body: req.body,
      flashes: req.flash()
    });
    return; // stop the fn from running
  }
  next(); // there were no errors
};

exports.validateEmail = (req, res, next) => {
  req.sanitizeBody("email").normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  next();
};

exports.register = async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    tokens: 2
  });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next(); // pass ro authController.login
};

exports.account = async (req, res) => {
  const userOwnedDocuments = await Documents.find({
    _id: { $in: req.user.documents }
  });
  res.render("account", {
    title: "Edit Your Account",
    userOwnedDocuments
  });
};

exports.updateAccount = async (req, res) => {
  const updates = {
    name: req.body.name
    // email: req.body.email
  };

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updates },
    { new: true, runValidators: true, context: "query" }
  );

  res.redirect("back");
};

exports.checkTokens = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id });
  if (user.tokens > 0) {
    next();
    return;
  }
  req.flash("error", "Sorry you do not have the tokens to buy this :(");
  res.redirect("back");
};

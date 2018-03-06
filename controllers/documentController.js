const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const Documents = mongoose.model("Documents");
const Schools = mongoose.model("Schools");
const User = mongoose.model("User");
const Programs = mongoose.model("Programs");
const Courses = mongoose.model("Courses");
const crypto = require("crypto");
var path = require("path");
const multer = require("multer");
const _ = require("lodash");

var storage = multer.diskStorage({
  destination: "." + process.env.UPLOAD_DESTINATION,
  fileFilter(req, file, next) {
    const isPdf = file.mimetype.startsWith("application/");
    if (isPdf) {
      next(null, true);
    } else {
      next({ message: "That filetype is not allowed!" }, false);
    }
  },
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return cb(err);
      cb(null, raw.toString("hex") + file.originalname.replace(/\s+/g, ""));
    });
  }
});

exports.addDocuments = async (req, res) => {
  const schools = await Schools.find();
  res.render("addDocuments", {
    title: "Add documents",
    schools
  });
};

exports.getSchools = async (req, res) => {
  const schools = await Schools.find();
  res.render("schools", { title: "Schools", schools });
};

exports.getPrograms = async (req, res) => {
  var schoolParam = req.params.school;
  const programs = await Programs.find({
    school: new ObjectId(req.params.school)
  });
  res.render("programs", { title: "Programs", programs, schoolParam });
};

exports.getCourses = async (req, res) => {
  const courses = await Courses.find({
    programs: new ObjectId(req.params.program)
  });
  res.render("courses", { title: "Courses", courses });
};

exports.getDocuments = async (req, res) => {
  const documents = await Documents.find({
    course: new ObjectId(req.params.course)
  });
  res.render("documents", { title: "Documents", documents });
};

exports.upload = multer({ storage }).single("document");

exports.createDocument = async (req, res) => {
  // Add file path
  if (req.file) {
    req.body.document = req.file.filename;
  }
  // add author to document
  req.body.author = req.user._id;
  const documents = new Documents(req.body);
  await documents.save();

  // Add tokens to user
  const updateTokens = {
    tokens: req.user.tokens + 5
  };

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: updateTokens
    },
    { safe: true, upsert: true, new: true, context: "query" }
  );

  req.flash("success", "You added a document!");
  res.redirect("/");
};

exports.getDocumentBySlug = async (req, res, next) => {
  const document = await Documents.findOne({ slug: req.params.slug });
  if (!document) return next();
  // check if user ownes document
  var ownerCheck = userdoc => {
    return _.isEqual(document._id, userdoc);
  };

  const ownerStatus = req.user.documents.some(ownerCheck);

  res.render("document", { document, ownerStatus, title: document.name });
};

exports.searchPrograms = async (req, res) => {
  const programs = await Programs.find({
    school: new ObjectId(req.query.id)
  });
  res.json(programs);
};

exports.searchCourses = async (req, res) => {
  const courses = await Courses.find({
    programs: new ObjectId(req.query.id)
  });
  res.json(courses);
};

exports.countDocuments = async (req, res) => {
  const documentCount = await Documents.count();
  const schoolCount = await Schools.count();
  res.render("start", { documentCount, schoolCount, title: "Startpage" });
};

exports.buyDocument = async (req, res) => {
  const updateDocuments = {
    documents: new ObjectId(req.body.document)
  };

  const updateTokens = {
    tokens: req.user.tokens - 1
  };

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: updateDocuments,
      $set: updateTokens
    },
    { safe: true, upsert: true, new: true, context: "query" }
  );

  req.flash("success", "You bought a document!");
  res.redirect("/account");
};

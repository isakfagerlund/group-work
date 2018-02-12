const mongoose = require("mongoose");
const Documents = mongoose.model("Documents");
const crypto = require("crypto");
var path = require('path');
const multer = require("multer");


var storage = multer.diskStorage({
  destination: './public/uploads/documents/',
  fileFilter(req, file, next) {
    const isPdf = file.mimetype.startsWith("application/");
    if (isPdf) {
      next(null, true);
    } else {
      next({ message: "That filetype is not allowed!" }, false);
    }
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + file.originalname)
    })
  }
})

exports.addDocuments = (req, res) => {
  res.render("addDocuments", {
    title: "Add documents"
  });
};

exports.getDocuments = async (req, res) => {
  const documents = await Documents.find();
  res.render("documents", { title: "Documents", documents });
};

exports.upload = multer({ storage }).single("document")

exports.createDocument = async (req, res) => {
  // Add file path
  req.body.document = req.file.filename;
  const documents = new Documents(req.body);
  await documents.save();
  req.flash("success", "You added a document!");
  res.redirect("/");
};

exports.getDocumentBySlug = async (req, res, next) => {
  const document = await Documents.findOne({ slug: req.params.slug });
  if (!document) return next();
  res.render("document", { document, title: document.name });
};
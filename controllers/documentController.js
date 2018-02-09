const mongoose = require("mongoose");
const Documents = mongoose.model("Documents");
const multer = require("multer");


const multerOptions = {
  storage: multer.memoryStorage()
};

exports.addDocuments = (req, res) => {
  res.render("addDocuments", {
    title: "Add documents"
  });
};

exports.getDocuments = async (req, res) => {
  res.render("documents", { title: "Documents" });
};

exports.upload = multer(multerOptions).single("document");

exports.createDocument = async (req, res) => {
  const extension = req.file.mimetype.split("/")[1];
  req.body.document = `testing.${extension}`;

  const file = req.file.buffer;
  await file.write(`./public/uploads/${req.body.document}`);
  const document = new Documents(req.body);
  await document.save();
  req.flash("success", "You added a document!");
  res.redirect("/");
};
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const documentsSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a document name!"
  },
  document: String
});

documentsSchema.pre("save", function(next) {
  if (!this.isModified("name")) {
    next(); // Skipping
    return;
  }
  next();
});

module.exports = mongoose.model("Documents", documentsSchema);

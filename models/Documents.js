const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const documentsSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a document name!"
  },
  slug: String,
  document: String
});

documentsSchema.pre("save", function(next) {
  if (!this.isModified("name")) {
    next(); // Skipping
    return;
  }
  this.slug = slug(this.name);
  next();
});

module.exports = mongoose.model("Documents", documentsSchema);

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const workSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a work name!"
  }
});

workSchema.pre("save", function(next) {
  if (!this.isModified("name")) {
    next(); // Skipping
    return;
  }
  next();
});

module.exports = mongoose.model("Work", workSchema);

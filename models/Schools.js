const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const schoolsSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  }
});

module.exports = mongoose.model("Schools", schoolsSchema);

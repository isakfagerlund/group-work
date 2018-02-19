const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const programsSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  school: String
});

module.exports = mongoose.model("Programs", programsSchema);

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const programsSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  school: {type: mongoose.Schema.ObjectId, ref:"Schools"}
});

module.exports = mongoose.model("Programs", programsSchema);

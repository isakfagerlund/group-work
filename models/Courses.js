const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const coursesSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  programs: [{type:mongoose.Schema.ObjectId, ref:"Programs" }]
});

module.exports = mongoose.model("Courses", coursesSchema);

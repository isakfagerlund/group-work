const mongoose = require("mongoose");
const Work = mongoose.model("Work");

exports.addWork = (req, res) => {
  res.render("work", {
    title: "Add work"
  });
};

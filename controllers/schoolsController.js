const mongoose = require("mongoose");
const Schools = mongoose.model("Schools");

exports.getSchools = async (req, res) => {
  const schools = await Schools.find();
  res.render("schools", { title: "Schools", schools });
};

exports.homePage = (req, res) => {
  res.render("start");
};

exports.addStore = (req, res) => {
  res.render("editStore", {
    title: "Add Store"
  });
};

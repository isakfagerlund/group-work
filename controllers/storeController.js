const mongoose = require("mongoose");
const Store = mongoose.model("Store");

exports.homePage = (req, res) => {
  res.render("start");
};

exports.addStore = (req, res) => {
  res.render("editStore", {
    title: "Add Store"
  });
};

exports.createStore = async (req, res) => {
  const store = new Store(req.body);
  await store.save();
  req.flash("success", "You added a store!");
  res.redirect("/");
};

exports.getStores = async (req, res) => {
  const stores = await Store.find();
  res.render("stores", { title: "Stores", stores });
};

exports.editStore = async (req, res) => {
  const store = await Store.findOne({ _id: req.params.id });

  res.render("editStore", { title: `Edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
  req.body.location.type = "Point";

  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  }).exec();
  req.flash(
    "success",
    `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${
      store.slug
    }">View Store</a>`
  );
  res.redirect(`/stores/${store._id}/edit`);
};

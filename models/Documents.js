const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const documentsSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a document name!"
  },
  school: {type: mongoose.Schema.ObjectId, ref:"Schools"},
  programs: [{type: mongoose.Schema.ObjectId, ref:"Programs"}],
  course: {type: mongoose.Schema.ObjectId, ref:"Courses"},
  slug: String,
  document: String
});

documentsSchema.pre("save", async function(next) {
  if (!this.isModified("name")) {
    next(); // Skipping
    return;
  }
  this.slug = slug(this.name);

  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const documentsWithSlug = await this.constructor.find({slug: slugRegEx});
  if (documentsWithSlug.length) {
    this.slug = `${this.slug}-${documentsWithSlug.length + 1}`;
  }

  next();
});

module.exports = mongoose.model("Documents", documentsSchema);

const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  prodname: String,
  author: String,
});

module.exports = mongoose.model("Books", BookSchema);

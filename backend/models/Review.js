const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    language: String,
    code: String,
    reviewResult: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
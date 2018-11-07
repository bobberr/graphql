const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  brandName: {
    type: String,
    required: true
  },
  brandCountry: {
    type: String,
    required: true
  },
  startYear: {
    type: Number,
    required: true
  },
  endYear: {
    type: Number,
    required: true
  }
});

const BrandModel = mongoose.model("Brand", brandSchema);

module.exports = BrandModel;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const BrandModel = mongoose.model("Brand", brandSchema);

module.exports = BrandModel;

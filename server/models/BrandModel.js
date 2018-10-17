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

const brandModel = mongoose.model("Brand", brandSchema);

module.exports = brandModel;

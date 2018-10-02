const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
	name: {
		type: String,
		required: true
	}
});

const brandModel = mongoose.model('Brand', brandSchema);

export default brandModel;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AboutSchema = new Schema({
    name: {type: String, required: true},
    position: {type: String, required: true},
    description: {type: String, default: "Description to be added."},
    isActive: {type: Boolean, default: true},
    photoUrl: {type: String}
});

//Virtual URL to reference event
AboutSchema.virtual('url').get(function() {
    return '/about/' + this._id;
});

//Export Event model
module.exports = mongoose.model('About', AboutSchema);
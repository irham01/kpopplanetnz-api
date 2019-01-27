const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    name: {type: String, required: true},
    position: {type: String, required: true},
    description: {type: String, default: "Description to be added."},
    isActive: {type: Boolean, default: true},
    photoUrl: {type: String}
});

//Virtual URL to reference event
ProfileSchema.virtual('url').get(function() {
    return '/profile/' + this._id;
});

//Export Event model
module.exports = mongoose.model('Profile', ProfileSchema);
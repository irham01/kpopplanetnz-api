const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SponsorSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, default: "TBC"},
    location: {type: String, default: "TBC"},
    websiteUrl: {type: String},
    isActive: {type: Boolean, default: true},
    logoUrl: {type: String}
});

//Virtual URL to reference event
SponsorSchema.virtual('url').get(function() {
    return '/sponsor/' + this._id;
});

//Export Event model
module.exports = mongoose.model('Sponsor', SponsorSchema);
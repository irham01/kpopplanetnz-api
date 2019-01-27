const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {type: String, required: true},
    overview: {type: String, default: "Event overview"},
    description: {type: String, default: "Description to be added."},
    startDateTime: {type: Date, required: true},
    endDateTime: {type: Date, required: true},
    location: {type: String, default: "TBC"},
    isActive: {type: Boolean, default: true}
});

//Virtual URL to reference event
EventSchema.virtual('url').get(function() {
    return '/event/' + this._id;
});

//Export Event model
module.exports = mongoose.model('Event', EventSchema);
const Event = require('../models/event');

exports.events_list = function(req, res) {
    Event.find({}).exec(function(err, events) {
        if (err) {
            handleError(res, err.message, "Failed to get events.");
        } else {
            res.status(200).json(events);
        }
    });
}

exports.event_detail = function(req, res) {
    var eventId = req.params.id;
    Event.findById(eventId, (err, event) => {
        if (err) {
            handleError(res, err.message, "Failed to get specified event. Id: ", eventId, 404);
        } else {
            res.status(200).json(event);
        }
    });
}

exports.event_create = function(req, res) {
    const newEvent = new Event(req.body);
    newEvent.save(err => {
        if (err) {
            handleError(res, err.message, "Failed to create new event.");
        } else {
            res.status(201).json(newEvent);
        }
    });
}

exports.event_update = function(req, res) {
    Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, event) => {
            if (err) {
                handleError(res, err.message, "Failed to update the event. Id: " + req.params.id);
            } else {
                res.status(201).json(event);
            }
        }
    );
}

exports.event_delete = function(req, res) {
    Event.findByIdAndDelete(
        req.params.id, 
        (err, event) => {
            if (err) {
                handleError(res, err.message, "Failed to delete the event. Id: " + req.params.id);
            } else {
                res.status(204).send();
            }
        }
    );
}
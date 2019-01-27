const Event = require('../models/event');

exports.events_list = function(req, res, next) {
    Event.find((err, events) => {
        if (err) {
            err.response = "Failed to get events.";
            next(err);
        } else {
            res.status(200).json(events);
        }
    });
}

exports.event_detail = function(req, res, next) {
    var eventId = req.params.id;
    Event.findById(eventId, (err, event) => {
        if (err) {
            err.response = "Failed to get specified event. Id: " + eventId;
            err.status = 404;
            next(err);
        } else {
            res.status(200).json(event);
        }
    });
}

exports.event_create = function(req, res, next) {
    const newEvent = new Event(req.body);
    newEvent.save(err => {
        if (err) {
            err.response = "Failed to create new event.";
            next(err);
        } else {
            res.status(201).json(newEvent);
        }
    });
}

exports.event_update = function(req, res, next) {
    Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, event) => {
            if (err) {
                err.response = "Failed to update the event. Id: " + req.params.id;
                next(err);
            } else {
                res.status(200).json(event);
            }
        }
    );
}

exports.event_delete = function(req, res, next) {
    Event.findByIdAndDelete(
        req.params.id, 
        (err, event) => {
            if (err) {
                event.resposne = "Failed to delete the event. Id: " + req.params.id;
                next(err);
            } else {
                res.status(204).send();
            }
        }
    );
}
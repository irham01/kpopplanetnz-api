const Sponsor = require('../models/sponsor');

exports.sponsors_list = function(req, res, next) {
    Sponsor.find((err, sponsors) => {
        if (err) {
            err.response = "Failed to get sponsors.";
            next(err);
        } else {
            res.status(200).json(sponsors);
        }
    });
}

exports.sponsor_detail = function(req, res, next) {
    var sponsorId = req.params.id;
    Sponsor.findById(sponsorId, (err, sponsor) => {
        if (err) {
            err.response = "Failed to get specified sponsor. Id: " + sponsorId;
            err.status = 404;
            next(err);
        } else {
            res.status(200).json(sponsor);
        }
    });
}

exports.sponsor_create = function(req, res, next) {
    Sponsor.insertMany(req.body, (err, sponsors) => {
        if (err) {
            err.response = "Failed to create new sponsor(s).";
            next(err);
        } else {
            res.status(201).json(sponsors);
        }
    });
}

exports.sponsor_update = function(req, res, next) {
    Sponsor.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, sponsor) => {
            if (err) {
                err.response = "Failed to update the sponsor. Id: " + req.params.id;
                next(err);
            } else {
                res.status(200).json(sponsor);
            }
        }
    );
}

exports.sponsor_delete = function(req, res, next) {
    Sponsor.findByIdAndDelete(
        req.params.id, 
        (err, sponsor) => {
            if (err) {
                err.resposne = "Failed to delete the sponsor. Id: " + req.params.id;
                next(err);
            } else {
                res.status(204).json({
                    response: {
                        message: "Succssfully deleted sponsor id: " + req.params.id,
                        sponsor: sponsor
                    }
                });
            }
        }
    );
}
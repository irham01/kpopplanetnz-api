const Profile = require('../models/profile');

exports.profiles_list = function(req, res, next) {
    Profile.find((err, profiles) => {
        if (err) {
            err.response = "Failed to get profiles.";
            next(err);
        } else {
            res.status(200).json(profiles);
        }
    });
}

exports.profile_detail = function(req, res, next) {
    var profileId = req.params.id;
    Profile.findById(profileId, (err, profile) => {
        if (err) {
            err.response = "Failed to get specified profile. Id: " + profileId;
            err.status = 404;
            next(err);
        } else {
            res.status(200).json(profile);
        }
    });
}

exports.profile_create = function(req, res, next) {
    Profile.insertMany(req.body, (err, profiles) => {
        if (err) {
            err.response = "Failed to create new profile(s).";
            next(err);
        } else {
            res.status(201).json(profiles);
        }
    });
}

exports.profile_update = function(req, res, next) {
    Profile.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, profile) => {
            if (err) {
                err.response = "Failed to update the profile. Id: " + req.params.id;
                next(err);
            } else {
                res.status(200).json(profile);
            }
        }
    );
}

exports.profile_delete = function(req, res, next) {
    Profile.findByIdAndDelete(
        req.params.id, 
        (err, profile) => {
            if (err) {
                err.resposne = "Failed to delete the profile. Id: " + req.params.id;
                next(err);
            } else {
                res.status(204).json({
                    response: {
                        message: "Succssfully deleted profile id: " + req.params.id,
                        profile: profile
                    }
                });
            }
        }
    );
}
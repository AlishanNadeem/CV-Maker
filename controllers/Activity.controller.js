const User = require('../models/User.model');

exports.user_activity_add = ((req, res, next) => {

    User.findByIdAndUpdate({ _id: req.params.id },
        {
            $addToSet: {
                extraActivities: {
                    extraActivities : req.body.extraActivities
                }
            }
        },
        (err) => {
            if (err) return next(err);
            res.redirect('/index');
        });
});

exports.user_activity_update = ((req, res, next) => {

    User.updateOne({ _id: req.params.uId, "extraActivities._id": req.params.id },
        {
            $set: {
                "extraActivities.$.extraActivities" : req.body.extraActivities
            }
        },
        (err) => {
            if (err) return next(err);
            res.redirect('/index');
        }
    )
});

exports.user_activity_delete = ((req, res, next) => {

    User.findByIdAndUpdate({ _id: req.params.uId },
        {
            $pull: {
                extraActivities: {
                    _id : req.params.id
                }
            }
        },
        (err) => {
            if (err) return next(err);
            res.redirect('/index');
        });
});

exports.addActivityView = ((req, res) => {
    res.render('extraActivity', { page: ' Add Extra Curricular Activity', menuId: 'addActivities', id: req.params.id });
});

exports.updateActivityView = ((req, res, next) => {
    User.findOne({ _id: req.params.uId},
        {
            extraActivities: {
                $elemMatch: {
                    _id: req.params.id
                }
            }
        }, (err, user) => {
            if (err) return next(err);
            res.render('updateExtraActivity', { page: 'Update Extra Activity', menuId: 'updateExtraActivity', extraActivities: user.extraActivities[0], id:req.params.uId});
        });
});
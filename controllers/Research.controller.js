const User = require('../models/User.model');

exports.user_research_add = ((req, res, next) => {

    User.findByIdAndUpdate({ _id: req.params.id },
        {
            $addToSet: {
                researchExperience: {
                    projectName: req.body.projectName,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    researchField: req.body.researchField
                }
            }
        },
        (err) => {
            if (err) return next(err);
            res.redirect('/index');
        });
});

exports.user_research_update = ((req, res, next) => {

    User.updateOne({ _id: req.params.uId, "researchExperience._id": req.params.id },
        {
            $set: {
                "researchExperience.$.projectName" : req.body.projectName,
                "researchExperience.$.startDate" : req.body.startDate,
                "researchExperience.$.endDate" : req.body.endDate,
                "researchExperience.$.researchField" : req.body.researchField
            }
        },
        (err) => {
            if (err) return next(err);
            res.redirect('/index');
        }
    )
});

exports.user_research_delete = ((req, res, next) => {

    User.findByIdAndUpdate({ _id: req.params.uId },
        {
            $pull: {
                researchExperience: {
                    _id: req.params.id
                }
            }
        },
        (err) => {
            if (err) return next(err);
            res.redirect('/index');
        });
});

exports.addResearchView = ((req, res) => {
    res.render('research', { page: 'Add Research Experience', menuId: 'addResearches', id: req.params.id });
});

exports.updateResearchView = ((req, res, next) => {
    User.findOne({ _id: req.params.uId },
        {
            researchExperience: {
                $elemMatch: {
                    _id: req.params.id
                }
            }
        }, (err, user) => {
            if (err) return next(err);
            res.render('updateResearch', { page: 'Update Research Experience', menuId: 'updateResearch', researchExperience: user.researchExperience[0], id: req.params.uId });
        });
});
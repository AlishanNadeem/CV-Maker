const User = require('../models/User.model');

exports.user_work_add = ((req, res, next) => {

    User.findByIdAndUpdate({ _id: req.params.id },
        {
            $addToSet: {
                workExperience: {
                    companyName: req.body.companyName,
                    designation: req.body.designation,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    responsibilities: req.body.responsibilities
                }
            }
        },
        (err) => {
            if (err) return next(err);
            res.redirect('/index');
        });
});

exports.user_work_update = ((req, res, next) => {

    User.updateOne({ _id: req.params.uId, "workExperience._id": req.params.id },
        {
            $set: {
                "workExperience.$.companyName" : req.body.companyName,
                "workExperience.$.designation" : req.body.designation,
                "workExperience.$.startDate" : req.body.startDate,
                "workExperience.$.endDate" : req.body.endDate,
                "workExperience.$.responsibilities" : req.body.responsibilities
            }
        },
        (err) => {
            if (err) return next(err);
            res.redirect('/index');
        }
    )
});

exports.user_work_delete = ((req, res, next) => {

    User.findByIdAndUpdate({ _id: req.params.uId },
        {
            $pull: {
                workExperience: {
                    _id: req.params.id
                }
            }
        },
        (err) => {
            if (err) return next(err);
            res.redirect('/index');
        });
});

exports.addWorkView = ((req, res) => {
    res.render('workExperience', { page: 'Add Work Experience', menuId: 'addworkExperience', id: req.params.id });
});

exports.updateWorkView = ((req, res, next) => {
    User.findOne({ _id: req.params.uId},
        {
            workExperience: {
                $elemMatch: {
                    _id: req.params.id
                }
            }
        }, (err, user) => {
            if (err) return next(err);
            res.render('updateWorkExperience', { page: 'Update Work Experience', menuId: 'workExperience', workExperience: user.workExperience[0], id:req.params.uId});
        });
});
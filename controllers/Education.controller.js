const User = require('../models/User.model');
const mongoose = require('mongoose');

exports.user_education_add = ((req, res, next) => {

    User.findByIdAndUpdate({ _id: req.params.id },
        {
            $addToSet: {
                education: {
                    instituteName: req.body.instituteName,
                    program: req.body.program,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    field: req.body.field
                }
            }
        },
        (err) => {
            if (err) return next(err);
            res.redirect('/index');
        });
});

exports.user_education_update = ((req, res, next) => {

    User.updateOne({ _id: req.params.uId, "education._id": req.params.id },
        {
            $set: {
                "education.$.instituteName" : req.body.instituteName,
                "education.$.program" : req.body.program,
                "education.$.startDate" : req.body.startDate,
                "education.$.endDate" : req.body.endDate,
                "education.$.field" : req.body.field
            }
        },
        (err) => {
            if (err) return next(err);
            res.redirect('/index');
        }
    )
});

exports.user_education_delete = ((req, res, next) => {

    User.findByIdAndUpdate({ _id: req.params.uId },
        {
            $pull: {
                education: {
                    _id: req.params.id
                }
            }
        },
        (err) => {
            if (err) return next(err);
            res.redirect('/index');
        });
});

exports.user_education_list = ((req, res, next) => {
    User.findById(req.params.id, (err, list) => {
        if (err) return next(err);
        res.send(list.education);
    });
});

exports.addEducationView = ((req, res) => {
    res.render('education', { page: 'Add Education', menuId: 'addEducation', id: req.params.id });
});

exports.updateEducationView = ((req, res, next) => {
    User.findOne({ _id: req.params.uId},
        {
            education: {
                $elemMatch: {
                    _id: req.params.id
                }
            }
        }, (err, user) => {
            if (err) return next(err);
            res.render('updateEducation', { page: 'Update Education', menuId: 'updateEducation', education: user.education[0], id:req.params.uId});
        });
});

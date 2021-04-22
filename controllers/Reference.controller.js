const User = require('../models/User.model');

exports.user_reference_add = ((req, res, next) => {

    User.findByIdAndUpdate({ _id: req.params.id },
        {
            $addToSet: {
                references: {
                    name: req.body.name,
                    designation: req.body.designation,
                    company: req.body.company,
                    contactNumber: req.body.contactNumber,
                    contactEmail: req.body.contactEmail
                }
            }
        },
        (err) => {
            if (err) return next(err);
            res.redirect('/index');
        });
});

exports.user_reference_update = ((req, res, next) => {

    User.updateOne({ _id: req.params.uId, "references._id": req.params.id },
        {
            $set: {
                "references.$.name" : req.body.name,
                "references.$.designation" : req.body.designation,
                "references.$.company" : req.body.company,
                "references.$.contactNumber" : req.body.contactNumber,
                "references.$.contactEmail" : req.body.contactEmail
            }
        },
        (err) => {
            if (err) return next(err);
            res.redirect('/index');
        }
    )
});

exports.user_reference_delete = ((req, res, next) => {

    User.findByIdAndUpdate({ _id: req.params.uId },
        {
            $pull: {
                references: {
                    _id: req.params.id
                }
            }
        },
        (err) => {
            if (err) return next(err);
            res.redirect('/index');
        });
});

exports.addReferenceView = ((req, res) => {
    res.render('reference', { page: 'Add Reference', menuId: 'addReference', id: req.params.id });
});

exports.updateReferenceView = ((req, res, next) => {
    User.findOne({ _id: req.params.uId},
        {
            references: {
                $elemMatch: {
                    _id: req.params.id
                }
            }
        }, (err, user) => {
            if (err) return next(err);
            res.render('updateReference', { page: 'Update Reference', menuId: 'updateReferences', reference: user.references[0], id:req.params.uId});
        });
});
const User = require('../models/User.model');

exports.user_language_add = ((req, res, next) => {

    User.findByIdAndUpdate({ _id: req.params.id },
        {
            $addToSet: {
                languages: {
                    languages: req.body.languages
                }
            }
        },
        (err) => {
            if (err) return next(err);
            res.redirect('/index');
        });
});

exports.user_language_update = ((req, res, next) => {

    User.updateOne({ _id: req.params.uId, "languages._id": req.params.id },
        {
            $set: {
                "languages.$.languages" : req.body.languages
            }
        },
        (err) => {
            if (err) return next(err);
            res.redirect('/index');
        }
    )
});

exports.user_language_delete = ((req, res, next) => {

    User.findByIdAndUpdate({ _id: req.params.uId },
        {
            $pull: {
                languages: {
                    _id : req.params.id
                }
            }
        },
        (err) => {
            if (err) return next(err);
            res.redirect('/index');
        });
});

exports.user_language_list = ((req, res, next) => {
    User.findById({ _id: req.body.id }, (err, list) => {
        if (err) return next(err);
        res.send(list.language);
    });
});

exports.addLanguageView = ((req, res) => {
    res.render('language', { page: 'Add Language', menuId: 'addLanguages', id: req.params.id });
});

exports.updateLanguageView = ((req, res, next) => {
    User.findOne({ _id: req.params.uId},
        {
            languages: {
                $elemMatch: {
                    _id: req.params.id
                }
            }
        }, (err, user) => {
            if (err) return next(err);
            res.render('updateLanguage', { page: 'Update Language', menuId: 'updateLanguage', languages: user.languages[0], id:req.params.uId});
        });
});
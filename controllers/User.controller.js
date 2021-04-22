const User = require('../models/User.model');

exports.user_add = ((req, res, next) => {

    let user = new User({
        name: req.body.name,
        contactNo: req.body.contactNo,
        address: req.body.address,
        email: req.body.email,
        education: req.body.education,
        workExperience: req.body.workExperience,
        extraActivities: req.body.extraActivities,
        researchExperience: req.body.researchExperience,
        languages: req.body.languages,
        references: req.body.references,
    });

    user.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/index');
    });
});

exports.getAllUser = ((req, res, next) => {
    User.find((err, users) => {
        if (err) return next(err);
        res.send(users);
    });
});

exports.getRecentUser = ((req, res) => {
    User.find().sort({ _id: -1 }).limit(1).exec((err, user) => {
        if (err) {
            return next(err);
        }
        res.render('index', { page: "Home Page", menuId: "home", user: user });
    });
});

exports.getHomeView = ((req, res) => {
    // res.render('index1', { page: "Home Page", menuId: "home"});
});

exports.addUserView = ((req, res) => {
    res.render('user', { page: 'Add User', menuId: 'addUser' });
});

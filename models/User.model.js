const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    contactNo: { type: Number, required: true },
    address: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    education: [{
        instituteName: { type: String },
        program: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        field: { type: String }
    }],
    workExperience: [{
        companyName: { type: String },
        designation: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        responsibilities: { type: String }
    }],
    extraActivities: [{
        extraActivities: { type: String }
    }],
    researchExperience: [{
        projectName: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        researchField: { type: String }
    }],
    languages: [{
        languages: { type: String }
    }],
    references: [{
        name: { type: String },
        designation: { type: String },
        company: { type: String },
        contactNumber: { type: Number },
        contactEmail: { type: String }
    }]
});

module.exports = mongoose.model('User', userSchema);
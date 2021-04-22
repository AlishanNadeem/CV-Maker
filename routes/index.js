var express = require('express');
var router = express.Router();

const education_controller = require('../controllers/Education.controller');
const work_controller = require('../controllers/Work.controller');
const activity_controller = require('../controllers/Activity.controller');
const language_controller = require('../controllers/Language.controller');
const research_controller = require('../controllers/Research.controller');
const reference_controller = require('../controllers/Reference.controller');
const user_controller = require('../controllers/User.controller');

//Main view routes
// router.get('/index',user_controller.getHomeView);
router.get('/index', user_controller.getRecentUser);

//User
router.post('/addUser', user_controller.user_add);
router.get('/getAllUsers', user_controller.getAllUser);

router.get('/', user_controller.addUserView);

//Research
router.post('/addUserResearch/:id', research_controller.user_research_add);
router.post('/:uId/deleteUserResearch/:id', research_controller.user_research_delete);
router.post('/:uId/updateUserResearch/:id', research_controller.user_research_update);

router.get('/addResearchView/:id', research_controller.addResearchView);
router.get('/:uId/updateResearchView/:id', research_controller.updateResearchView);

//Education
router.post('/addUserEducation/:id', education_controller.user_education_add);
router.post('/:uId/deleteUserEducation/:id', education_controller.user_education_delete);
router.post('/:uId/updateUserEducation/:id', education_controller.user_education_update);
router.get('/getUserEducation/:id', education_controller.user_education_list);

router.get('/addEducationView/:id', education_controller.addEducationView);
router.get('/:uId/updateEducationView/:id', education_controller.updateEducationView);

//Language
router.post('/addUserLanguage/:id', language_controller.user_language_add);
router.post('/:uId/deleteUserLanguage/:id', language_controller.user_language_delete);
router.post('/:uId/updateUserLanguage/:id', language_controller.user_language_update);

router.get('/addLanguageView/:id', language_controller.addLanguageView);
router.get('/:uId/updateLanguageView/:id', language_controller.updateLanguageView);

//Work
router.post('/addUserWork/:id', work_controller.user_work_add);
router.post('/:uId/deleteUserWork/:id', work_controller.user_work_delete);
router.post('/:uId/updateUserWork/:id',work_controller.user_work_update);

router.get('/addWorkView/:id', work_controller.addWorkView);
router.get('/:uId/updateWorkView/:id', work_controller.updateWorkView);

//Reference
router.post('/addUserReference/:id', reference_controller.user_reference_add);
router.post('/:uId/deleteUserReference/:id', reference_controller.user_reference_delete);
router.post('/:uId/updateUserReference/:id',reference_controller.user_reference_update);

router.get('/addReferenceView/:id', reference_controller.addReferenceView);
router.get('/:uId/updateReferenceView/:id', reference_controller.updateReferenceView);

//Activity
router.post('/addUserActivity/:id', activity_controller.user_activity_add);
router.post('/:uId/deleteUserActivity/:id', activity_controller.user_activity_delete);
router.post('/:uId/updateUserActivity/:id',activity_controller.user_activity_update);

router.get('/addActivityView/:id', activity_controller.addActivityView);
router.get('/:uId/updateActivityView/:id', activity_controller.updateActivityView);

module.exports = router;

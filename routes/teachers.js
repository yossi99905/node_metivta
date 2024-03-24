const express = require("express");
const router = express.Router();
const {TeacherController} = require('../controllers/teacerControllers');
const {authTeacher} = require('../middleware/auth');


router.get("/",authTeacher, TeacherController.getAllUsersInClass);
router.put("/givePoints",authTeacher, TeacherController.givePoints);

module.exports = router;
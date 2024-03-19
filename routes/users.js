const UserController = require('../controllers/userControllers')
const express = require("express");
const router = express.Router();

const { authTeacher, authStudent } = require('../middleware/auth')



router.get("/", authTeacher, UserController.getAllUsers);
router.post("/", UserController.createUser);
router.post("/login", UserController.loginUser);
router.get("/refresh", authStudent, UserController.refreshUserToken);

module.exports = router;
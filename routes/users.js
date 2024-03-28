const UserController = require('../controllers/userControllers')
const express = require("express");
const router = express.Router();

const { authTeacher, authStudent,authAdmin } = require('../middleware/auth')



router.get("/", authAdmin, UserController.getAllUsers);
router.post("/",authAdmin ,UserController.createUser);
router.put("/:id",authAdmin,UserController.updateUser);
router.delete("/:id",authAdmin,UserController.deleteUser);
router.post("/login", UserController.loginUser);
router.get("/refresh", authStudent, UserController.refreshUserToken);

module.exports = router;
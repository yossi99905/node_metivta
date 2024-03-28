const categoryController = require('../controllers/categoryControllers')
const express = require('express');
const router = express.Router();
const { authTeacher, authStudent,authAdmin } = require('../middleware/auth')

router.get('/',categoryController.getAllCategories);
router.post('/',authAdmin,categoryController.createCategories);
router.put('/:id',authAdmin,categoryController.updateCategories);
router.delete('/:id',authAdmin,categoryController.deleteCategories);

module.exports = router;
module.exports = router;
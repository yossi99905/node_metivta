const categoryController = require('../controllers/categoryControllers')
const express = require('express');
const router = express.Router();

router.get('/',categoryController.getAllCategories);
router.post('/',categoryController.createCategories);

module.exports = router;
module.exports = router;
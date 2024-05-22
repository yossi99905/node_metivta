
const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/productsControllers');
const { authAdmin,authStore,authTeacher } = require('../middleware/auth');

router.get("/",authAdmin,authTeacher,authStore,ProductController.getAllProducts);
router.post("/",authAdmin,authTeacher,authStore,ProductController.createPorduct);
router.put("/:id",authAdmin,authTeacher,authStore,ProductController.updateProduct);
router.delete("/:id",authAdmin,authTeacher,authStore,ProductController.deleteProduct);





module.exports = router;
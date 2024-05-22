
const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/productsControllers');
const { authAdmin,authStore,authTeacher } = require('../middleware/auth');

router.get("/",authStore,ProductController.getAllProducts);
router.post("/",authStore,ProductController.createPorduct);
router.put("/:id",authStore,ProductController.updateProduct);
router.delete("/:id",authStore,ProductController.deleteProduct);





module.exports = router;

const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/productsControllers');
const { authAdmin } = require('../middleware/auth');

router.get("/",authAdmin,ProductController.getAllProducts);
router.post("/",authAdmin,ProductController.createPorduct);
router.put("/:id",authAdmin,ProductController.updateProduct);
router.delete("/:id",authAdmin,ProductController.deleteProduct);





module.exports = router;
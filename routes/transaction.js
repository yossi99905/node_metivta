
const express = require('express');
const router = express.Router();

const {TransactionsController} = require('../controllers/transactionsControllers');

router.get("/",TransactionsController.getAllTransactions);
router.post("/:studentEmail",TransactionsController.createTransaction);




module.exports = router;
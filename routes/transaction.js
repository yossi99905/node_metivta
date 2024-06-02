
const express = require('express');
const router = express.Router();

const {TransactionsController} = require('../controllers/transactionsControllers');

router.get("/",TransactionsController.getAllTransactions);
router.post("/:studentEmail",TransactionsController.createTransaction);
router.get("/:studentEmail",TransactionsController.getTransactionsByStudentEmail);




module.exports = router;
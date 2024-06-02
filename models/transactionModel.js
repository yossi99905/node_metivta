const mongoose = require('mongoose');
const Joi = require('joi');

const transactionSchema = new mongoose.Schema({
    transactionDate: {
        type: Date,
        default: Date.now
    },
    transactionType: {
        type: String,
        enum: ['debit', 'credit']
    },
    category: String,
    pointsAmount: Number,
    balanceBeforeTransaction: Number,
    balanceAfterTransaction: Number,
    performedByName: String,
    performedByEmail: String
});

const studentSchema = new mongoose.Schema({
    studentEmail: {
        type: String,
        min: 3,
        max: 30,
        required: true
    },
    transactions: [transactionSchema] // Nested Schema for transactions
}, { timestamps: true });

exports.StudentModel = mongoose.model("transactions", studentSchema);
exports.TransactionModel = mongoose.model("transaction", transactionSchema);

exports.validTransaction = (body) => {
    const joiTransactionSchema = Joi.object({
        transactionType: Joi.string().valid('debit', 'credit').required(),
        category: Joi.string().min(3).max(30).required(),
        pointsAmount: Joi.number().min(0).max(999).required(),
        balanceBeforeTransaction: Joi.number().min(0).max(999).required(),
        balanceAfterTransaction: Joi.number().min(0).max(999).required(),
        performedByName: Joi.string().min(3).max(30).required(),
        performedByEmail: Joi.string().email().required()
    })
    return joiTransactionSchema.validate(body)
}

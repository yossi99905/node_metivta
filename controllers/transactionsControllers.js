const { StudentModel, validTransaction, TransactionModel } = require('../models/transactionModel');

exports.TransactionsController = {
    async getAllTransactions(req, res) {
        try {
            const students = await StudentModel.find({});
            const transactions = students.flatMap(student => student.transactions);
            res.json(transactions);
        } catch (err) {
            console.log(err);
            res.status(502).json({ err });
        }
    },
    async createTransaction(req, res) {
        const { body } = req;
        const validBody = validTransaction(body);
        if (validBody.error) {
            return res.status(401).json(validBody.error.details);
        }

        try {
            const { studentEmail } = req.params;
            let student = await StudentModel.findOne({ studentEmail });

            if (!student) {
                // Create new student if not found
                student = new StudentModel({ studentEmail });
            }

            // Add transaction to student
            student.transactions.push(body);
            await student.save();

            res.status(201).json(body);
        } catch (err) {
            console.log(err);
            res.status(502).json({ err });
        }
    },

    async updateTransaction(req, res) {
        const { studentId, transactionId } = req.params;
        const { body } = req;
        const validBody = validTransaction(body, "update");
        if (validBody.error) {
            return res.status(401).send(validBody.error.details);
        }
        try {
            const student = await StudentModel.findById(studentId);
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            const transaction = student.transactions.id(transactionId);
            if (!transaction) {
                return res.status(404).json({ error: 'Transaction not found' });
            }
            Object.assign(transaction, body);
            await student.save();
            res.json({ msg: "Transaction updated" });
        } catch (err) {
            console.log(err);
            res.status(502).json({ err });
        }
    },
    async deleteTransaction(req, res) {
        const { studentId, transactionId } = req.params;
        try {
            const student = await StudentModel.findById(studentId);
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            student.transactions.pull(transactionId);
            await student.save();
            res.json({ msg: "Transaction deleted" });
        } catch (err) {
            console.log(err);
            res.status(502).json({ err });
        }
    },
    async getTransactionsByStudentEmail(req, res) {
        const { studentEmail } = req.params;
        const { page = 1, limit = 3 } = req.query; // Default to page 1 and limit 3

        try {
            const student = await StudentModel.findOne({ studentEmail });

            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }

            // sort transactions by date
            const sortedTransactions = student.transactions.sort((a, b) => b.transactionDate - a.transactionDate);

            // paginate transactions
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + parseInt(limit, 10);
            const paginatedTransactions = sortedTransactions.slice(startIndex, endIndex);

            res.json(paginatedTransactions);
        } catch (err) {
            console.log(err);
            res.status(502).json({ err });
        }
    }

};

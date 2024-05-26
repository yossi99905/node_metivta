const express = require("express");
const router = express.Router();
const { UserModel } = require("../models/userModel");
const { StudentModel } = require("../models/transactionModel");

router.post("/", async (req, res) => {
    const { body } = req;
    try {
        const { email, secretCode } = body;
        const price = parseFloat(body.price);

        // מצא את המשתמש לפי אימייל
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.json("user not found");
        }
        if (user.secretCode !== secretCode) {
            return res.json({ msg: "secret code not match" });
        }
        if (user.score < price) {
            return res.json({ msg: "not enough score", score: user.score });
        }

        // בדוק את סך הרכישות היומיות
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        const student = await StudentModel.findOne({ studentEmail: email });
        let totalSpentToday = 0;

        if (student && student.transactions.length > 0) {
            const transactionsToday = student.transactions.filter(transaction =>
                transaction.transactionDate >= today && transaction.transactionDate <= endOfDay && transaction.category === "purchase"
            );

            totalSpentToday = transactionsToday.reduce((total, transaction) => {
                return total + transaction.pointsAmount;
                
            }, 0);
            
        }

        if (totalSpentToday + price > 50) {
            return res.json({ msg: "Daily limit exceeded" });
        }

        // עדכן את הנקודות של המשתמש
        const updatedFields = {
            score: user.score - price
        };
        await UserModel.updateOne({ _id: user._id }, updatedFields);

        // הוסף את הטרנזקציה החדשה
        const newTransaction = {
            transactionType: 'debit',
            category: 'purchase',
            pointsAmount: price,
            balanceBeforeTransaction: user.score,
            balanceAfterTransaction: updatedFields.score,
            performedByName: user.firstName + ' ' + user.lastName,
            performedByEmail: user.email
        };

        if (!student) {
            const newStudent = new StudentModel({
                studentEmail: email,
                transactions: [newTransaction]
            });
            await newStudent.save();
        } else {
            student.transactions.push(newTransaction);
            await student.save();
        }

        res.json({ msg: "payment done", score: updatedFields.score });
    } catch (err) {
        console.log(err);
        res.status(502).json({ err });
    }
});

module.exports = router;




// const express = require("express");
// const router = express.Router();
// const {UserModel} = require("../models/userModel");


// router.post("/",async(req,res)=>{
//     const {body} = req;
//     try{
//         const { email, price,secretCode } = body;
//         // Decrease the score of the user with the given email by the price
//         const user = await UserModel.findOne({email:email});
//         if(!user){
//             return res.json("user not found");
//         }
//         if(user.secretCode !== secretCode){
//             return res.json({msg:"secret code not match"});
//         }
//         if(user.score < price){
//             return res.json({msg:"not enough score",score:user.score});
//         }
//         const updatedFields = {
//             score:user.score - price
//         };
//         await UserModel.updateOne({_id:user._id},updatedFields);
//         res.json({msg:"payment done",score:updatedFields.score});
//     }
//     catch(err){
//         console.log(err);
//         res.status(502).json({err})
//     }
// });


// module.exports = router;
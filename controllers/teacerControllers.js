const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken");
const { UserModel, valideUser, crateToken } = require('../models/userModel');



TeacherController = {

    getAllUsersInClass: async (req, res) => {
        const classNum = req.query.classNum;
        try {
            let query = {};
            if (classNum !== "0") {
                query.classRoom = classNum;
            }
            
            const data = await UserModel.find({
                ...query,// if classNum is not 0 then add classNum to the query
                role: { $in: [1000] } // 1000 is the role of the student
            }).select('name email classRoom score');
            res.json(data);
        }
        catch (err) {
            console.log(err);
            res.status(502).json({ err })
        }
    },
    givePoints: async (req, res) => {
     
        const { email, points } = req.body;
    
        try {
            for (const userEmail of email) {
                const user = await UserModel.findOne({ email: userEmail });
                if (user) {
                    user.score += points;
                    await user.save();
                }
            }
    
            res.json({ msg: "Points added" });
        } catch (err) {
            console.log(err);
            res.status(502).json({ err });
        }
    }
    
}
exports.TeacherController = TeacherController;





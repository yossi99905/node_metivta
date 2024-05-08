const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken");
const { UserModel, valideUser, crateToken } = require('../models/userModel')

UserController = {
    async getAllUsers(req, res) {
        try {
            const data = await UserModel.find({}).sort({ 'role.0': 1 ,classRoom:1,lastName:1}).select('lastName firstName email classRoom ID birthday score role');
            res.json(data);
        }
        catch (err) {
            console.log(err);
            res.status(502).json({ err })
        }
    },

    async createUser(req, res) {
        const { body } = req;
        const validBody = valideUser(body);
        if (validBody.error) {
            return res.status(401).json(validBody.error.details)
        }
        try {
            const user = new UserModel(body);
            const hadhCode = await bcrypt.hash(user.password, 10);
            user.password = hadhCode;
            await user.save();
            user.password = "*****";
            res.status(201).json(user);
        }
        catch (err) {
            console.log(err);
            res.status(502).json({ err })
        }
    },
    async updateUser(req, res) {
        const { id } = req.params;
        const { body } = req;
        // const validBody = valideUser(body, "update")
        // if (validBody.error) {
        //     res.status(401).send(validBody.error.details);
        // }
        try {
            const user = await UserModel.findOne({ _id: id});
            if (!user) {
                return res.json("user not found");
            }
            const updatedFields = {
                firstNmame: body.firstNmame,
                lastName: body.lastName,
                email: body.email,
                classRoom: body.classRoom,
                ID: body.ID,
                birthday: body.birthday,
                score: body.score,
                role: [body.role],


            };

            if (body.password) {
                const hadhCode = await bcrypt.hash(body.password, 10);
                updatedFields.password = hadhCode;
            }

            userUpdate = await UserModel.updateOne({ _id: id }, updatedFields);
            res.json({ msg: "user updated",data:user });
        }
        catch (err) {
            console.log(err);
            res.status(502).json({ err })
        }
    },
    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const user = await UserModel.deleteOne({ _id: id });
            if (user.deletedCount === 0) {
                return res.json("user not found");
            }
            res.json({ msg: "user deleted",user });
        }
        catch (err) {
            console.log(err);
            res.status(502).json({ err })
        }
    },

    async loginUser(req, res) {
        const { body } = req;
        const validBody = valideUser(body, "login")
        if (validBody.error) {
            res.status(401).send(validBody.error.details);
        }
        try {
            const user = await UserModel.findOne({ email: body.email })
            if (!user) {
                return res.json("user not found");
            }
            const pass = await bcrypt.compare(body.password, user.password);
            if (!pass) {
                return res.json("incorrect pass");
            }
            //connected
            const token = crateToken(user._id, user.role);
            res.json({ token, role: user.role,  score: user.score, classRoom: user.classRoom,secretCode:user.secretCode,firstName:user.firstName,lastName:user.lastName });
        }
        catch (err) {
            console.log(err);
            res.status(502).json({ err })
        }
    },

    async refreshUserToken(req, res) {
        const userId = req.tokenData._id;
        try {
            const data = await UserModel.findOne({ _id: userId });
            const token = crateToken(userId, data.role);
            res.json({ token, role: data.role, firstName: data.firstName,lastName:data.lastName,classRoom: data.classRoom,score:data.score,secretCode:data.secretCode });
        }
        catch (err) {
            console.log(err);
            res.status(502).json({ err })
        }
    // },
    // async  createUsers(usersData) {
    //     const createdUsers = [];
    
    //     for (const userData of usersData) {
    //         try {
    //             const user = new UserModel(userData);
    //             const hashedPassword = await bcrypt.hash(user.password, 10);
    //             user.password = hashedPassword;
    //             await user.save();
    //             user.password = "*****";
    //             createdUsers.push(user);
    //         } catch (error) {
    //             console.log(`Failed to create user: ${error}`);
    //         }
    //     }

    }
};

module.exports = UserController;
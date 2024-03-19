const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { UserModel, valideUser, crateToken } = require('../models/userModel')

UserController = {
    async getAllUsers(req, res) {
        try {
            const data = await UserModel.find({});
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
            res.json({ token, role: user.role, name: user.name });
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
            res.json({ token, role: data.role, name: data.name });
        }
        catch (err) {
            console.log(err);
            res.status(502).json({ err })
        }
    }
};

module.exports = UserController;
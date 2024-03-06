const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { UserModel, valideUser,crateToken } = require('../models/userModel')
const {auth} = require('../middleware/auth')



router.get("/", async (req, res) => {
    try {
        const data = await UserModel.find({});
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }

})

router.post("/", async (req, res) => {
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
})

router.post("/login", async (req, res) => {
    const { body } = req;
    const validBody = valideUser(body,"login")
    if(validBody.error){
        res.status(401).send(validBody.error.details);
    }

    try {
        const user = await UserModel.findOne({ email: body.email })
        if (!user) {
            return res.json("user not found");
        }

        const pass = await bcrypt.compare( body.password,user.password );
        if (!pass) {
            return res.json("incorect pass");
        }
        //conected
        const token = crateToken(user._id,user.role); 
        res.json(token);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

module.exports = router;
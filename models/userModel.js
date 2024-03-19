const mongoose = require('mongoose');
const Joi = require("joi");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dateOfBirth: Date,
    ID: String,
    image: String,
    role: {
        type: [String], default: ["1000"]
    }


}, { timestamps: true })


exports.UserModel = mongoose.model("users", userSchema);

//crate tokon
exports.crateToken = (userId,role) => {
    const token = jwt.sign({_id:userId,role},process.env.TOKEN_WORD,{expiresIn:"60mins"})
    return token;
}

exports.valideUser = (body, route) => {
    if (route == "login") {
        const joiLoginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(2).max(16).required(),
        })

        return joiLoginSchema.validate(body)
    }
    const joiRegisterSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(2).max(16).required(),
        dateOfBirth: Joi.date(),
        ID: Joi.string().min(9).max(9).required(),
        image: Joi.string().min(3).max(100),
    

    })
    return joiRegisterSchema.validate(body)
}
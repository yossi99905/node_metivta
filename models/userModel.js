const mongoose = require('mongoose');
const Joi = require("joi");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    classRoom: Number,
    dateOfBirth:{
        type:Date, 
        default: "1990-01-01"
    },
    ID: String,
    score:{
        type:Number,default:0
    },
    image: String,
    secretCode: {
        type: String, default: (Math.floor(Math.random() * 9000) + 1000).toString()
    },
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
        firstName: Joi.string().min(2).max(16).required(),
        lastName: Joi.string().min(2).max(16).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(2).max(16).required(),
        classRoom: Joi.number().max(10).required(),
        dateOfBirth: Joi.date(),
        score: Joi.number().min(0).max(1000),
        ID: Joi.string().min(9).max(9).required(),
        image: Joi.string().min(3).max(100),
        secretCode: Joi.string().min(4).max(4),
        role: Joi.array().items(Joi.string().min(4).max(4))
    

    })
    return joiRegisterSchema.validate(body)
}
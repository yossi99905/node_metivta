const mongoose = require('mongoose');
const Joi = require("joi");
const jwt = require("jsonwebtoken");


const PointsGiveSchema = new mongoose.Schema({
    email: String,
    score:{
        type:Number,default:0
    }
}, { timestamps: true })

exports.PointsGiveSchema = mongoose.model("users", PointsGiveSchema);
    


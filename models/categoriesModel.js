const mongoose = require('mongoose');
const Joi = require('joi');

const categoriesSchema = new mongoose.Schema({
    name: String,
    score: Number,
    
}, { timestamps: true })

exports.categoriesModel = mongoose.model("categories",categoriesSchema);

exports.validCategories = (body) => {
    const joicategorySchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        score: Joi.number().min(0).max(999).required(),
        
    })
    return joicategorySchema.validate(body)
}
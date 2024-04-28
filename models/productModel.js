const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    barcodeNum: String,
    soldCount: Number,
    inventoryCount: Number,
    image: String,
    inStock: {
        type: Boolean,
        default: true
    },
    category:{
        type: String,
        default: "general"
    },
    isPinned:{
        type: Boolean,
        default: false
    }, 
}, { timestamps: true })

exports.ProductModel = mongoose.model("products",productSchema);

exports.validProduct = (body) => {
    const joiProdoctSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        price: Joi.number().min(0).max(999).required(),
        barcodeNum: Joi.string().min(3).max(30),
        inventoryCount: Joi.number().min(0).max(999),
        image: Joi.string().min(3).max(100),
        inStock: Joi.boolean(),
        category: Joi.string().min(3).max(30),
        isPinned: Joi.boolean(),
    })
    return joiProdoctSchema.validate(body)
}
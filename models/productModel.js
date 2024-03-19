const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    barcodeNum: String,
    inventoryCount:Number,
    image:String,
}, { timestamps: true })

exports.ProductModel = mongoose.model("products",productSchema);

exports.validProduct = (body) => {
    const joiProdoctSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        price: Joi.number().min(0).max(999).required(),
        barcodeNum: Joi.string().min(3).max(30),
        inventoryCount: Joi.number().min(0).max(999).required(),
        image: Joi.string().min(3).max(100),
    })
    return joiProdoctSchema.validate(body)
}
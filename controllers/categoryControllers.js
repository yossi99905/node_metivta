const {categoriesModel,validCategories} = require('../models/categoriesModel')

categoryController = {
    async getAllCategories(req, res) {
        try {
            const data = await categoriesModel.find({});
            res.json(data);
        }
        catch (err) {
            console.log(err);
            res.status(502).json({ err })
        }
    },

    async createCategories(req, res) {
        const { body } = req;
        const validBody = validCategories(body);
        if (validBody.error) {
            return res.status(401).json(validBody.error.details)
        }
        try {
            const category = new categoriesModel(body);
            await category.save();
            res.status(201).json(category);
        }
        catch (err) {
            console.log(err);
            res.status(502).json({ err })
        }
    }
};

module.exports = categoryController;
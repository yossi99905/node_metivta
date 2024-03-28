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
    ,
    async updateCategories(req, res) {
        const { id } = req.params;
        const { body } = req;
        const validBody = validCategories(body, "update")
        if (validBody.error) {
            res.status(401).send(validBody.error.details);
        }
        try {
            const category = await categoriesModel.findOne({ _id: id });
            if (!category) {
                return res.json("category not found");
            }
            const updatedFields = {
                name: body.name,
                description: body.description,
                image: body.image
            };
            await categoriesModel.updateOne({ _id: id }, updatedFields);
            res.json({ msg: "category updated" });
        }
        catch (err) {
            console.log(err);
            res.status(502).json({ err })
        }
    },
    async deleteCategories(req, res) {
        const { id } = req.params;
        try {
            await categoriesModel.deleteOne({ _id: id });
            res.json({ msg: "category deleted" });
        }
        catch (err) {
            console.log(err);
            res.status(502).json({ err })
        }
    }
};

module.exports = categoryController;
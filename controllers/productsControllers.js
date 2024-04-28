const {ProductModel,validProduct} = require('../models/productModel')

ProductsController = {
    async getAllProducts(req, res) {
        try {
            const data = await ProductModel.find({});
            res.json(data);
        }
        catch (err) {
            console.log(err);
            res.status(502).json({ err })
        }
    },
    async createPorduct(req,res) {
        const {body} = req;
        const validBody = validProduct(body);
        if(validBody.error){
            return res.status(401).json(validBody.error.details)
        }
        try{
            const product = new ProductModel(body);
            await product.save();
            res.status(201).json(product);
        }
        catch(err){
            console.log(err);
            res.status(502).json({err})
        }
    },
    async updateProduct(req,res){
        const {id} = req.params;
        const {body} = req;
        const validBody = validProduct(body,"update")
        if(validBody.error){
            res.status(401).send(validBody.error.details);
        }
        try{
            const product = await ProductModel.findOne({_id:id});
            if(!product){
                return res.json("product not found");
            }
            // const updatedFields = {
            //     name:body.name,
            //     description:body.description,
            //     price:body.price,
            //     image:body.image
            // };
            await ProductModel.updateOne({_id:id},body);
            res.json({msg:"product updated"});
        }
        catch(err){
            console.log(err);
            res.status(502).json({err})
        }
    },
    async deleteProduct(req,res){
        const {id} = req.params;
        try{
            await ProductModel.deleteOne({_id:id});
            res.json({msg:"product deleted"});
        }
        catch(err){
            console.log(err);
            res.status(502).json({err})
        }
    }

    

}

module.exports = ProductsController;
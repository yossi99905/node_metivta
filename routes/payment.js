const express = require("express");
const router = express.Router();
const {UserModel} = require("../models/userModel");


router.post("/",async(req,res)=>{
    const {body} = req;
    try{
        const { email, price,secretCode } = body;
        // Decrease the score of the user with the given email by the price
        const user = await UserModel.findOne({email:email});
        if(!user){
            return res.json("user not found");
        }
        if(user.secretCode !== secretCode){
            return res.json({msg:"secret code not match"});
        }
        if(user.score < price){
            return res.json({msg:"not enough score",score:user.score});
        }
        const updatedFields = {
            score:user.score - price
        };
        await UserModel.updateOne({_id:user._id},updatedFields);
        res.json({msg:"payment done",score:updatedFields.score});
    }
    catch(err){
        console.log(err);
        res.status(502).json({err})
    }
});


module.exports = router;
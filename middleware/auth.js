const jwt = require("jsonwebtoken");

exports.auth = (req,res,next) => {
    const token = req.header("x-api-key");
    if(!token){
        return res.status(401).json({err:"no token"})
    }
    try{
        const deCode = jwt.verify(token,process.env.TOKEN_WORD)
        req.tokenData = deCode;
        next();
    }
    catch(err){
        res.status(401).json({err})
    }
    
}

exports.authAdmin = (req,res,next) => {
    
    
}
const jwt = require("jsonwebtoken");

exports.authStudent = (req, res, next) => {
    const token = req.header("x-api-key");
    if (!token) {
        
        return res.status(401).json({ err: "no token" })
    }

    try {
        const deCode = jwt.verify(token, process.env.TOKEN_WORD)

        req.tokenData = deCode;

        next();
    }
    catch (err) {
        res.status(401).json({ err })
    }

}

exports.authTeacher = (req, res, next) => {
    
    const token = req.header("x-api-key");

    if (!token) {
        
        return res.status(401).json({ err: "no token" })
    }

    try {
        const deCode = jwt.verify(token, process.env.TOKEN_WORD)

        req.tokenData = deCode;
        if (!deCode.role.includes("2000") && !deCode.role.includes("3000")) {
            return res.status(403).json({ err: "Unauthorized" });
        }

        next();
    }
    catch (err) {
        res.status(401).json({ err })
    }

}

exports.authAdmin = (req, res, next) => {


}
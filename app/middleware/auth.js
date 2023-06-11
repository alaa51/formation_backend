const jwt = require('jsonwebtoken');

const JWT_SECRET =
    "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

const verifyToken = function (req, res, next){
    const token = (req?.headers?.authorization?.split(' '))[1] ;
    if (!token){
        return res?.status(403).send("A token is required for authentification");
    }
    try{
        req.user = jwt.verify(token, JWT_SECRET);
    }catch (err){
        return res.status(401).send("Invalid token")
    }
    return next();
}

module.exports = verifyToken

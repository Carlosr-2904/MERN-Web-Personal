const jwt  = require('../utils/jwt');

function asureAuth(req, res, next) {
    
    if(!req.headers.authorization) {
        return res.status(403).send({msg: "The request does not have the authorization header"});
    }

    const token = req.headers.authorization.replace("Bearer ", "");
    
    try {
        const payload = jwt.verify(token);
        
        const {exp} = payload;
        const currentTime = new Date().getTime();
        if (exp <= currentTime) {
            return res.status(401).send({msg: "Token expired"});
        }

        req.user = payload;
        next()
    }catch (error) {
        res.status(400).send({msg: "Invalid token"});
    }

}

module.exports = {
    asureAuth
}
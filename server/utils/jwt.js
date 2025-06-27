const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = require('../constants');

function createAccessToken(user) {
    const expTokenn = new Date();
    expTokenn.setHours(expTokenn.getHours() + 3); // Token expires in 3 hours

    const payload ={
        token_type: "access",
        user_id: user._id,
        iat: Date.now(),
        exp: expTokenn.getTime()
    }

    return jwt.sign(payload, JWT_SECRET_KEY);
}


function createRefreshToken(user) {
    const expTokenn = new Date();
    expTokenn.getMonth(expTokenn.getMonth() + 1); // Token expires in 1 month

    const payload = {
        token_type: "refresh",
        user_id: user._id,
        iat: Date.now(),
        exp: expTokenn.getTime()
    }

    return jwt.sign(payload, JWT_SECRET_KEY);
}

function decoded(Token){
    return jwt.decode(token, JWT_SECRET_KEY, true);
}

function verify(token) {
    return jwt.verify(token, JWT_SECRET_KEY)
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    decoded,
    verify
}
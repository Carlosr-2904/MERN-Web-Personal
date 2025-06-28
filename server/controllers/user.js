const User = require('../models/user');

async function getMe(req, res) {
    const {user_id} = req.user;

    const response = await User.findById(user_id);

    if (!response) {
        return res.status(404).send({msg: "User not found"});
    }else{
        res.status(200).send(response)
    }


}

module.exports = {
    getMe
}
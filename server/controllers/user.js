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


async function getUsers(req, res) {

    const {active} = req.query;
    let response=null
    if (active === undefined) {
        response = await User.find();
    } else {
        response = await User.find({active});
    }

    console.log(response);

    res.status(200).send(response);
}

module.exports = {
    getMe,
    getUsers
}
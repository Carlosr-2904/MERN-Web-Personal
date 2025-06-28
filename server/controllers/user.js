const bcrypt = require('bcryptjs');
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

    res.status(200).send(response);
}


async function createUser(req, res){
    
    const {password} =req.body;

    const user = new User({ ...req.body, active: false});
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    if(req.files.avatar){
        //To do
        console.log("Process avatar");
    }

    try {
        const userStored = await user.save();
        return res.status(201).send({ userStored });
    } catch (error) {
        return res.status(400).send({ msg: "Error creating user", error });
    }

}

module.exports = {
    getMe,
    getUsers,
    createUser
}
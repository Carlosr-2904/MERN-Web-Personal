const bcrypt = require('bcryptjs');
const User = require('../models/user');
const image = require("../utils/image");

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
        const imagePath = image.getFilePath(req.files.avatar);
        user.avatar = imagePath;
    }

    try {
        const userStored = await user.save();
        return res.status(201).send({ userStored });
    } catch (error) {
        return res.status(400).send({ msg: "Error creating user" });
    }

}


async function updateUser(req, res) {
    const { id } = req.params;
    const userData = req.body;

    if (userData.password) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password, salt);
        userData.password = hashPassword; // Hash the password before saving
    }else{
        delete userData.password; // Remove password if not provided
    }

    if (req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar);
        userData.avatar = imagePath; // Update avatar path
    }

    try {
        await User.findByIdAndUpdate(id, userData, { new: true }); // optional: new: true returns updated doc
        return res.status(200).send({ msg: "User updated successfully" });
    } catch (error) {
        return res.status(500).send({ msg: "Error updating user"});
    }

    
}


async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).send({ msg: "User not found" });
        }

        return res.status(200).send({ msg: "User deleted successfully" });
    } catch (error) {
        return res.status(400).send({ msg: "Error deleting user" });
    }
}


module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
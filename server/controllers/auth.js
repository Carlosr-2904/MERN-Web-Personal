const { model } = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

function register(req, res) {
    const {firstname, lastname, email, password}= req.body;
    // console.log(req.body);

    if (!email) res.status(400).send({
        msg: "Email is required"
    });
    if (!password) res.status(400).send({
        msg: "Password is required"
    });

    const user=new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false
    });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    user.password = hash;

    try {
        const userStorage = user.save();
        res.status(200).send({ user});
    }catch (error) {
        res.status(400).send({ msg: "Error creating user" }, error);
    }

    // user.save((error, userStorage) => {
    //     if (error){
    //         res.status(400).send({msg: "Error creating user" });
    //     }else{
    //         res.status(200).send({userStorage});
    //     }
    // })
}
module.exports = { register };
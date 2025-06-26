// const { model } = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

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

}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email) return res.status(400).send({ msg: "Email is required" });
    if (!password) return res.status(400).send({ msg: "Password is required" });

    const emailLowerCase = email.toLowerCase();

    try {
        const userStore = await User.findOne({ email: emailLowerCase });

        if (!userStore) {
            return res.status(400).send({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, userStore.password);

        if (!isMatch) {
            return res.status(400).send({ msg: "Invalid credentials" });
        }

        if (!userStore.active) {
            return res.status(401).send({ msg: "User is not active" });
        }

        // Aquí se puede generar y enviar un JWT si se necesita
        // res.status(200).send({ result: "Login OK", user: userStore });
        res.status(200).send({
            acces: jwt.createAccessToken(userStore),
            register: jwt.createRefreshToken(userStore)
        });

    } catch (err) {
        res.status(500).send({ msg: "Server error", error: err.message });
    }
}

module.exports = { register, login };
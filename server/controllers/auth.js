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

// function refreshAccessToken(req, res){
//     const {token} = req.body;
    
//     if(!token) return res.status(400).send({ msg: "Token is required" });

//     const user_id = jwt.decoded(token);

//     User.findById(user_id, (err, user) => {
//         if(err){
//             res.status(500).send({ msg: "Server error"});
//         }else{
//             res.status(200).send({
//                 access: jwt.createAccessToken(user)
//             });
//         }
//     })
// }


// async function refreshAccessToken(req, res) {
//     const { token } = req.body;

//     if (!token) return res.status(400).send({ msg: "Token is required" });

//     try {
//         const decodedToken = jwt.decode(token);

//         const user = await User.findById(decodedToken.user_id);
//         if (!user) {
//             return res.status(404).send({ msg: "User not found" });
//         }

//         // Assuming you have your own function to create access tokens
//         const newAccessToken = jwt.sign(
//             { user_id: user._id }, 
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         res.status(200).send({ access: newAccessToken });

//     } catch (err) {
//         console.error("Error refreshing token:", err);
//         res.status(401).send({ msg: "Invalid or expired token" });
//     }
// }

async function refreshAccessToken(req, res) {
    const { token } = req.body;

    if (!token) return res.status(400).send({ msg: "Token is required" });

    try {
        // Use your jwt utility to decode/verify the token and extract the user_id
        const payload = jwt.verify(token); // or jwt.verify(token), depending on your utility
    
        const user_id = payload.user_id || payload.id || payload._id; // adjust according to your payload structure
        if (!user_id) return res.status(401).send({ msg: "Invalid token payload" });
        
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).send({ msg: "User not found" });
        }

        // Use your jwt utility to create a new access token
        const newAccessToken = jwt.createAccessToken(user);

        res.status(200).send({ access: newAccessToken });

    } catch (err) {
        console.error("Error refreshing token:", err);
        res.status(401).send({ msg: "Invalid or expired token" });
    }
}


module.exports = { register, login, refreshAccessToken };
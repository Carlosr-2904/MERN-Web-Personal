const newsletter = require ('../models/newsletter');

// Functions
async function suscribeEmail(req, res) {
    try{
        const {email} = req.body

        if(!email){
            return res.status(400).send({msg: "Email is required"});
        }

        const newsletterData = new newsletter({
            email: email.toLowerCase()
        })

        const newsletterStored = await newsletterData.save();

        if (!newsletterStored){
            return res.status(404).send({msg: "Email could not be subscribed"});
        }

        return res.status(201).send({msg: "Email subscribed successfully"});
    }catch (err) {
        return res.status(500).send({msg: "Error subscribing email", error: err.message});
    }
}


module.exports = {
    suscribeEmail
};
const { get } = require('express/lib/response');
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


async function getEmails(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { created_at: "desc" }
    };
    try {
        const newsletters = await newsletter.paginate({}, options);

        return res.status(200).send(newsletters);
    } catch (err) {
        return res.status(500).send({ msg: "Error retrieving emails", error: err.message });
    }
}

async function deleteEmail(req, res) {
    const{id }= req.params
    try{
        const deletedNewsletter = await newsletter.findByIdAndDelete(id)

        if(!deletedNewsletter){
            return res.status(404).send({msg: "Email not found"});
        }

        return res.status(200).send({msg: "Email deleted successfully"});
    } catch (err) {
        return res.status(500).send({ msg: "Error deleting email", error: err.message });
    }
}

module.exports = {
    suscribeEmail,
    getEmails,
    deleteEmail
};
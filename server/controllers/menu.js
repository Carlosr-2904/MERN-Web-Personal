const Menu = require('../models/menu');

async function createMenu(req, res) {
    try {
        const menu = new Menu(req.body);
        const menuStored = await menu.save();
        return res.status(201).send({ menuStored });
    } catch (err) {
        return res.status(400).send({ msg: "Error creating menu"});
    }
}


module.exports = {
    createMenu
}
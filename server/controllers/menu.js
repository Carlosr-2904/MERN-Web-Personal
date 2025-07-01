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

async function getMenus(req, res) {
    const {active} = req.query;
    let response=null
    if (active === undefined) {
        response = await Menu.find().sort({order: "asc"});
    } else {
        response = await Menu.find({active}).sort({order: "asc"});
    }
    
    if(!response){
        res.status(404).send({msg: "No menus found"});
    }else{
        res.status(200).send(response);
    }
    
}

module.exports = {
    createMenu,
    getMenus
}
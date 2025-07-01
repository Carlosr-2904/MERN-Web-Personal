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

async function updateMenu(req, res) {
    const { id } = req.params;
    const menuData = req.body;

    try {
        const menuUpdated = await Menu.findByIdAndUpdate(id, menuData, { new: true });
        if (!menuUpdated) {
            return res.status(404).send({ msg: "Menu not found" });
        }
        return res.status(200).send({ menuUpdated });
    } catch (err) {
        return res.status(400).send({ msg: "Error updating menu" });
    }
}


async function deleteMenu(req, res) {
    const { id } = req.params;

    try {
        const menuDeleted = await Menu.findByIdAndDelete(id);
        if (!menuDeleted) {
            return res.status(404).send({ msg: "Menu not found" });
        }
        return res.status(200).send({ msg: "Menu deleted successfully" });
    } catch (err) {
        return res.status(400).send({ msg: "Error deleting menu" });
    }
}
module.exports = {
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu
}
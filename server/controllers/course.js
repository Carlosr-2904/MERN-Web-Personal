const Course = require('../models/course');
const image = require('../utils/image');

async function createCourse(req, res) {
    try {
        const course = new Course(req.body);
        const imagePath =image.getFilePath(req.files.miniature);
        course.miniature = imagePath;

        const courseStored = await course.save();
        return res.status(201).send({ courseStored });
    } catch (err) {
        console.error("Error creating course:", err);
        return res.status(400).send({ msg: "Error creating course" }, err);
    }
}



// async function getCourses(req, res) {
//     const course = new Course(req.body);

//     const imagePath =image.getFilePath(req.files.miniature);
// }

module.exports = { 
    createCourse 
}
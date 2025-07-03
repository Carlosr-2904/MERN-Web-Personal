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


async function getCourse(req, res) {
    const {page =1, limit=10} = req.query;
    // Example of pagination options
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    try {
        const courses = await Course.paginate({}, options);
        return res.status(200).send(courses);
    } catch (err) {
        return res.status(400).send({ msg: "Error retrieving courses", error: err.message });
    }
}



module.exports = { 
    createCourse, 
    getCourse
}
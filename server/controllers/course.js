const course = require('../models/course');
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

// async function updateCourse(req, res) {
//     const {id} = req.params
//     const courseData = req.body;

//     if(req.files.miniature){
//         const imagePath = image.getFilePath(req.files.miniature);
//         courseData.miniature = imagePath;
//     }

//     Course.findByIdAndUpdate({_id: id}, courseData, (err)=>{
//         if(err){
//             res.status(400).send({ msg: "Error updating course" }, err);
//         }else{
//             res.status(200).send({ msg: "Course updated successfully" }); 
//         }
//     })
// }

async function updateCourse(req, res) {
    try {
        const { id } = req.params;
        const courseData = req.body;

        // Si hay una nueva imagen enviada, obtener su path
        if (req.files?.miniature) {
            const imagePath = image.getFilePath(req.files.miniature);
            courseData.miniature = imagePath;
        }

        // Actualización usando await y opciones modernas
        const updatedCourse = await Course.findByIdAndUpdate(id, courseData, {
            new: true,       // Retorna el documento modificado
            runValidators: true // Ejecuta validaciones del schema
        });

        if (!updatedCourse) {
            return res.status(404).send({ msg: "Course not found" });
        }

        res.status(200).send({ msg: "Course updated successfully"});
    } catch (error) {
        res.status(400).send({ msg: "Error updating course", error: error.message });
    }
}

module.exports = { 
    createCourse, 
    getCourse,
    updateCourse
}
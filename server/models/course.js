const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');  

const courseSchema = mongoose.Schema({
    title: String,
    miniature: String,
    description: String,
    url: String,
    precio: Number,
    score: Number
})

courseSchema.plugin(mongoosePaginate); // Add pagination plugin

module.exports = mongoose.model('Course', courseSchema);
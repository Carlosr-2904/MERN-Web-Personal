const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const course = require('./course');

const postSchema = mongoose.Schema({
    title: String,
    miniature: String,
    content: String,
    path: {
        type: String,
        unique: true
    },
    created_at: Date
})

postSchema.plugin(mongoosePaginate); // Add pagination plugin

module.exports = mongoose.model('Post', postSchema);
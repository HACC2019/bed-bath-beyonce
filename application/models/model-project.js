const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    email: String,
    name: String,
    date: Date,
    address: String,
    description: String,
    photo: String,
    likes: Number
}, {collection: 'project'});

const project = mongoose.model('project', projectSchema);

module.exports = project;
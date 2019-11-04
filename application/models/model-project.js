const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    posted_by: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}],
    name: String,
    date: Date,
    address: String,
    description: String,
    photo: String,
    likes: Number
}, {collection: 'project'});

const project = mongoose.model('project', projectSchema);

module.exports = project;
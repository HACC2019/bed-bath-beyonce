const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    posted_by: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}],
    title: String,
    description: String,
    start_date: String,
    end_date: String,
    location: String,
    school: String,
    photo: String,
    date_posted: {type: Date, default: Date.now} 
}, {collection: 'project'});

const project = mongoose.model('project', projectSchema);

module.exports = project;
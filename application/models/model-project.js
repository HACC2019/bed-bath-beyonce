const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    posted_by: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    badges: [{type: mongoose.Schema.Types.ObjectId, ref: 'badge'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}],
    title: String,
    description: String,
    start_date: Date,
    end_date: Date,
    address: String,
    school: String,
    photo: String,
    date_posted: {type: Date, default: Date.now} 
}, {collection: 'project'});

const project = mongoose.model('project', projectSchema);

module.exports = project;
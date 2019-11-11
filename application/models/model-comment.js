const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    posted_by: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    project: {type: mongoose.Schema.Types.ObjectId, ref: 'project', required: true},
    date_posted: {type: Date, default: Date.now},
    text: String
}, {collection: 'comment'});

const comment = mongoose.model('comment', commentSchema);

module.exports = comment;
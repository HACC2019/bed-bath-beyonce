const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    emailRecipient: String,
    emailReceiver: String,
    date: Date,
    monetary: Number,
    other: String
}, {collection: 'comment'});

const comment = mongoose.model('comment', commentSchema);

module.exports = comment;
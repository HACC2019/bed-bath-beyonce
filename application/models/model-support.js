const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supportSchema = new Schema({
    emailRecipient: String,
    emailReceiver: String,
    date: Date,
    monetary: Number,
    other: String
}, {collection: 'support'});

const support = mongoose.model('user', userSchema);

module.exports = support;

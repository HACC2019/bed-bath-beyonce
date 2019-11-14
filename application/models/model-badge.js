const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const badgeSchema = new Schema({
    title: String,
    icon: String
}, {collection: 'badge'});

const badge = mongoose.model('badge', badgeSchema);

module.exports = badge;

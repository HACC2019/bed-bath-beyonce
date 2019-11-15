const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: String,
    fname: String,
    lname: String,
    school: String,
    organization: String,
    account_type: String,
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'project'}],
    projects_joined: [{type: mongoose.Schema.Types.ObjectId, ref: 'project'}]
}, {collection: 'user'});

const user = mongoose.model('user', userSchema);

module.exports = user;

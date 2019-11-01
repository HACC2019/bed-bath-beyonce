const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: String,
    fname: String,
    lname: String,
    school: String,
    organization: String,
    accountType: String
}, {collection: 'user'});

const user = mongoose.model('user', userSchema);

//Export as mongoose model for business operations on the database
module.exports = user;

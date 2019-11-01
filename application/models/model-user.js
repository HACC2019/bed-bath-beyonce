const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: String,
    mname: String,
    lname: String,
    school: String
}, {collection: 'user'});

const user = mongoose.model('user', userSchema);

//Export as mongoose model for business operations on the database
module.exports = user;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: String,
    email: String,
    passwordHash: String,
    img: String,
});

module.exports = mongoose.model('User', UserSchema);
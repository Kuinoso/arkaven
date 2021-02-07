const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: String,
    email: String,
    passwordHash: String,
    img: String,
    resetToken: String,
    expireToken: Date,
});

module.exports = mongoose.model('User', UserSchema);
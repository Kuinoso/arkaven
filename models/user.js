const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    scores: [{
        type: Schema.Types.ObjectId,
        ref: 'score',
    }],
});

module.exports = mongoose.model('User', UserSchema);
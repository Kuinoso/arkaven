const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GameSchema = new Schema({
    name: String,
    scores: [{
        type: Schema.Types.ObjectId,
        ref: 'score',
    }],
});

module.exports = mongoose.model('Game', GameSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ScoreSchema = new Schema({
    score: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    // game: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Game',
    // },
});

module.exports = mongoose.model('Score', ScoreSchema);
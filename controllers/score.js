const ScoreModel = require('../models/score');

const ScoreController = {
    getUserScores: async (req, res) => {
        const userScores = await ScoreModel.find({
            user: req.params.id
        });

        res.json(userScores);
    },

    getGameScores: async (req, res) => {
        const gameScores = await ScoreModel.find({
            game: req.params.id
        });

        res.json(gameScores);
    },

    create: async (req, res) => {
        let newScore = new ScoreModel(req.body);
        let savedScore = await newScore.save();

        res.json(savedScore);
    },
};

module.exports = ScoreController;
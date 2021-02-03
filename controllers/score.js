const ScoreModel = require('../models/score');

const ScoreController = {
    find: async (req, res) => {
        const found = await ScoreModel.findById(req.params.id);

        res.json(found);
    },

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

    all: async (req, res) => {
        const allScores = await ScoreModel.find();

        res.json(allScores);
    },

    create: async (req, res) => {
        let newScore = new ScoreModel(req.body);
        let savedScore = await newScore.save();

        res.json(savedScore);
    },
};

module.exports = ScoreController;
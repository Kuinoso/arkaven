const ScoreModel = require('../models/score');

const ScoreController = {
    getUserScores: async (req, res) => {
        const scores = await ScoreModel.find({
            user: req.params.userId
        });

        const userScores = scores.filter(item => item.game === req.params.gameId);
        scores.map(item => console.log(typeof(JSON.stringify(item.game)), typeof(req.params.gameId)))

        userScores.sort(function (a, b) {
            const keyA = a.score;
            const keyB = b.score;
            // Compare the 2 dates
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });

        const topUserScores = userScores.slice(0, 10);

        res.json(topUserScores);
    },

    getGameScores: async (req, res) => {
        const gameScores = await ScoreModel.find({
            game: req.params.id
        });

        res.json(gameScores);
    },

    highscores: async (req, res) => {
        const gameScores = await ScoreModel.find({
            game: req.params.id
        });

        gameScores.sort(function (a, b) {
            const keyA = a.score;
            const keyB = b.score;
            // Compare the 2 dates
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });

        const topHighScores = gameScores.slice(0, 10);

        res.json(topHighScores);
    },

    create: async (req, res) => {
        let newScore = new ScoreModel(req.body);
        let savedScore = await newScore.save();

        res.json(savedScore);
    },
};

module.exports = ScoreController;
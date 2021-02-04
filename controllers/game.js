const GameModel = require('../models/game');

const GameController = {
    all: async (req, res) => {
        const allGames = await GameModel.find();

        res.json(allGames);
    },

    create: async (req, res) => {
        console.log(req.body);
        const newGame = new GameModel(req.body);
        const savedGame = await newGame.save();

        res.json(savedGame);
    },
};

module.exports = GameController;
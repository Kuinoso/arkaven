const GameModel = require('../models/game');

const GameController = {
    find: async (req, res) => {
        const found = await GameModel.findById(req.params.id);

        res.json(found);
    },

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

    edit: async (req, res) => {
        await GameModel.findByIdAndUpdate(req.params.id, req.body, function (err) {
            if (!err) {
                res.send('updated');

                return;
            };

            res.send(err);
        });
    },

    delete: async (req, res) => {
        await GameModel.findByIdAndRemove(req.params.id, function (err) {
            if (!err) {
                res.send('deleted');

                return;
            };

            res.send(err);
        });
    },
};

module.exports = GameController;
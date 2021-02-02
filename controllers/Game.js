const GameModel = require('../models/Game');

const GameController = {
    find:  async (req, res) => {
        const found = await GameModel.findById(req.params.id);
        console.log(found);
        res.json(found);
    },
    all: async (req, res) => {
        const allGames = await GameModel.find();
        res.json(allGames);
    },
    create: async (req, res) => {
        let newGame = new GameModel(req.body);
        let savedGame = await newGame.save();

        res.json(savedGame);
    },
    // getAllScores: async (req, res) => {
    //     let foundUser = await UserModel.find({name: req.params.username}).populate('scores');

    //     res.json(foundUser);
    // },
};

module.exports = GameController;
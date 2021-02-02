const UserModel = require('../models/User');

const UserController = {
    find:  async (req, res) => {
        const found = await UserModel.find({
            name: req.params.username
        });

        res.json(found);
    },
    all: async (req, res) => {
        const allUsers = await UserModel.find();

        res.json(allUsers);
    },
    create: async (req, res) => {
        let newUser = new UserModel(req.body);
        let savedUser = await newUser.save();

        res.json(savedUser);
    },
    getAllScores: async (req, res) => {
        let foundUser = await UserModel.find({name: req.params.username}).populate('scores');

        res.json(foundUser);
    },
};

module.exports = UserController;
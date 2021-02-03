const UserModel = require('../models/user');

const UserController = {
    find:  async (req, res) => {
        const found = await UserModel.findById(req.params.id);

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
    edit: async (req, res) => {
        await UserModel.findByIdAndUpdate(req.params.id, req.body, function (err) {
            if (!err) {
                res.send('updated');

                return;
            };

            res.send(err);
        });
    },
    delete: async (req, res) => {
        await UserModel.findByIdAndRemove(req.params.id, function (err) {
            if (!err) {
                res.send('deleted');

                return;
            };

            res.send(err);
        });
    },
};

module.exports = UserController;
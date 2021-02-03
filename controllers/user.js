const UserModel = require('../models/user');
const fs = require('fs');

const UserController = {
    find: async (req, res) => {
        const found = await UserModel.findById(req.params.id);

        res.json(found);
    },

    all: async (req, res) => {
        const allUsers = await UserModel.find();

        res.json(allUsers);
    },

    create: async (req, res) => {
        fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1])
        let pic = req.file.filename + '.' + req.file.mimetype.split('/')[1];
        let json = JSON.parse(req.body.json); 
        const user = {
            name: json.name,
            email: json.email,
            password: json.password,
            img: pic,
        };
        console.log(json);
        let newUser = new UserModel(user);
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
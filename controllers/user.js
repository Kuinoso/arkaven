require('dotenv/config');

const UserModel = require('../models/user');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const UserController = {
    all: async (req, res) => {
        const allUsers = await UserModel.find();

        res.json(allUsers);
    },

    create: async (req, res) => {
        const { name, email, password, img } = req.body;

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            res.status(400).json({
                errorMessage: 'An account with this email already exists.',
            });

            return;
        };

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        let newUser = new UserModel({
            name,
            email,
            passwordHash,
            img,
        });

        let savedUser = await newUser.save();

        const token = jwt.sign({
            user: savedUser._id,
        }, process.env.JWT_SECRET);

        res
            .cookie('token', token, {
                httpOnly: true,
            })
            .send(savedUser._id);
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        const loginUser = await UserModel.findOne({ email });

        if (!loginUser) {
            res.status(401).json({
                errorMessage: 'Wrong email or password.'
            });

            return;
        };

        const correctPassword = await bcrypt.compare(password, loginUser.passwordHash);

        if (!correctPassword) {
            res.status(401).json({
                errorMessage: 'Wrong email or password.'
            });

            return;
        };

        const token = jwt.sign({
            user: loginUser._id,
        }, process.env.JWT_SECRET);

        res
            .cookie('token', token, {
                httpOnly: true,
            })
            .send(loginUser._id);
    },

    logout: (req, res) => {
        res
            .cookie('token', '', {
                httpOnly: true,
                expires: new Date(0)
            })
            .send();
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
require('dotenv/config');

const UserModel = require('../models/user');

const bcrypt = require('bcryptjs');

const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const resetTemplate = require('../templates/resetPassword');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_KEY,
    },
}));

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
                expires: new Date(253402300000000),
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
                expires: new Date(253402300000000),
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

    resetPassword: (req, res) => {
        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                console.log(err);

                return;
            };

            const token = buffer.toString('hex');

            const user = await UserModel.findOne({ email: req.body.email });

            if (!user) {
                res.status(422).json({
                    errorMessage: 'This email is not registered'
                });

                return;
            };

            user.resetToken = token;
            user.expireToken = Date.now() + 3600000;

            await user.save();

            transporter.sendMail({
                to: user.email,
                from: 'noreply.arkaven@gmail.com',
                subject: 'Reset your password',
                html: resetTemplate(`http://localhost:3000/reset/${token}`),
            });

            res.json({ message: 'Email sent' })
        });
    },

    newPassword: async (req, res) => {
        const newPassword = req.body.password;
        const sentToken = req.body.token;

        const user = await UserModel.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } });

        if (!user) {
            res.status(422).json({
                errorMessage: 'This link has expired, please request a new link.'
            });

            return;
        };

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(newPassword, salt);

        user.passwordHash = passwordHash;
        user.resetToken = undefined;
        user.expireToken = undefined;

        await user.save();

        res.send('Password updated successfully');
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
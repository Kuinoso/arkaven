const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const GameControls = require('../controllers/game');
const ScoreControls = require('../controllers/score');
const UserControls = require('../controllers/user');

//Game routes
router.get('/allGames', GameControls.all);

router.post('/newGame', GameControls.create);

//User routes
router.get('/allUsers', UserControls.all);

router.get('/logout', UserControls.logout);

router.post('/newUser', UserControls.create);

router.post('/login', UserControls.login);

router.post('/resetPassword', UserControls.resetPassword);

router.post('/newPassword', UserControls.newPassword);

router.put('/editUser/:id', auth, UserControls.edit);

router.delete('/deleteUser/:id', auth, UserControls.delete);


//Score routes
router.get('/userScores/:gameId/:userId', auth, ScoreControls.getUserScores);

router.get('/gameScores/:id', ScoreControls.getGameScores);

router.get('/highscores/:id', ScoreControls.highscores);

router.post('/newScore', auth, ScoreControls.create);

module.exports = router;
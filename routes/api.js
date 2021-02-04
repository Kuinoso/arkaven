const express = require('express');
const router = express.Router();

const GameControls = require('../controllers/game');
const ScoreControls = require('../controllers/score');
const UserControls = require('../controllers/user');

//Game routes
router.get('/allGames', GameControls.all);

router.get('/game/:id', GameControls.find);

router.post('/newGame', GameControls.create);

router.put('/editGame/:id', GameControls.edit);

router.delete('/deleteGame/:id', GameControls.delete);

//User routes
router.get('/allUsers', UserControls.all);

router.get('/user/:id', UserControls.find);

router.post('/newUser', UserControls.create);

router.put('/editUser/:id', UserControls.edit);

router.delete('/deleteUser/:id', UserControls.delete);


//Score routes
router.get('/userScores/:id', ScoreControls.getUserScores);

router.get('/gameScores/:id', ScoreControls.getGameScores);

router.post('/newScore', ScoreControls.create);

module.exports = router;
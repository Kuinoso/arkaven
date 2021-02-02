const express = require('express');
const router = express.Router();

const GameControls = require('../controllers/Game');

router.get('/game/:id', GameControls.find);

router.get('/allGames', GameControls.all);

router.post('/newGame', GameControls.create);
// const BlogPost = require('../models/blogPost');

//Routes
// router.get('/api', (req, res) => {
//     BlogPost.find({})
//         .then((data) => {
//             res.json(data);
//         })
//         .catch((error) => {
//             console.log('Error: ', error);
//         });
// });

// router.get('/api/name', (req, res) => {
//     const data = {
//         username: 'Merlin',
//         age: 200,
//     };
//     res.json(data);
// });

// router.post('/api/save', (req, res) => {
//     const newBlogPost = new BlogPost(req.body);

//     newBlogPost.save((error) => {
//         if (error) {
//             console.log(error);
//         } else {
//             res.json({
//                 msg: 'Data saved!',
//             });
//         };
//     });
// });

module.exports = router;
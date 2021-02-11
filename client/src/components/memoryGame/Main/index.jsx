import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import initializeDeck from '../deck';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useStyles } from './styles.js';
import throne from '../../../images/throne.jpeg';
import matchSound from '../../../sounds/match.mp3';
import gotTheme from '../../../sounds/got.mp3';
import tMemory from '../../../images/memoryT.png';
import Board from '../Board';
import Display from '../../Display';
import Highscores from '../../Highscores';
import UserScores from '../../UserScores';

export default function Main() {
    const classes = useStyles();

    const myRef1 = useRef();
    const myRef2 = useRef();

    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [gameOver, setFinished] = useState(false);
    const [clicks, setClicks] = useState(1);
    const [scores, setScores] = useState([]);
    const [userScores, setUserScores] = useState([]);

    const loggedIn = useSelector(
        (store) => store.UserReducer.loggedIn
    );
    const game = useSelector(
        (store) => store.GameReducer.allGames.filter(item => item.name === 'memory')[0]
    );
    const user = useSelector(
        (store) => store.UserReducer.loggedUser
    );
    const users = useSelector(
        (store) => store.UserReducer.allUsers
    );

    const getScores = () => {
        axios.get(`/api/highscores/${game._id}`)
            .then(res => {
                const highscores = res.data;
                const list = [];

                for (let i = 0; i < highscores.length; i++) {
                    const user = users.filter(user => user._id === highscores[i].user)[0];

                    list.push({
                        id: highscores[i].user,
                        score: highscores[i].score,
                        name: user.name,
                        img: user.img,
                    });
                };
                list.sort(function (a, b) {
                    const keyA = a.score;
                    const keyB = b.score;
                    // Compare the 2 dates
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                });
                setScores(list);
            })
            .catch(err => console.log(err));
    };

    const getUserScores = () => {
        axios.get(`/api/userScores/${user}`)
            .then(res => {
                const userScores = res.data.filter(item => item.game === game._id);

                userScores.sort(function (a, b) {
                    const keyA = a.score;
                    const keyB = b.score;
                    // Compare the 2 dates
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                });

                const topUserScores = userScores.slice(0, 10);

                setUserScores(topUserScores);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        setCards(initializeDeck());
        preloadMedia();
        getScores();
    }, []);

    useEffect(() => {
        if (user) {
            getUserScores();
        };
    }, [user]);

    useEffect(() => {
        preloadDeckImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cards.join(",")]);

    const preloadDeckImages = () => {
        // eslint-disable-next-line array-callback-return
        cards.map(card => {
            const src = require(`../../../images/${card.type}.png`).default;

            new Image().src = src;
        });
    };

    const preloadMedia = () => {
        const src = require('../../../images/throne.jpeg').default;

        new Image().src = src;
    };

    const sameCardClicked = (id) => flipped.includes(id);

    const isMatched = (id) => {
        const clickedCard = cards.find(card => card.id === id);
        const flippedCard = cards.find(card => flipped[0] === card.id);

        return clickedCard.type === flippedCard.type
    };

    const resetCards = () => {
        setFlipped([]);

        setDisabled(false);
    };

    const handleClick = (id) => {
        setDisabled(true);

        setClicks(clicks + 1);

        if (flipped.length === 0) {
            setFlipped([id]);

            setDisabled(false);
        } else {
            if (sameCardClicked(id)) return;

            setFlipped([...flipped, id]);

            if (isMatched(id)) {
                setSolved([...solved, flipped[0], id]);

                resetCards();

                if (solved.length === 10) {
                    myRef2.current.volume = 0.3;
                    myRef2.current.play();

                    if (loggedIn) {
                        const data = {
                            score: clicks / 2,
                            user: user,
                            game: game._id,
                        };
                        axios.post('/api/newScore', data)
                            .then(() => {
                                getScores();
                                getUserScores();
                            })
                            .catch(err => console.log(err));
                    };

                    Swal.fire({
                        title: `You won with ${Math.floor(clicks / 2)} attempts`,
                        text: 'Now YOU are the rightful heir to the iron throne!',
                        imageUrl: throne,
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Throne image',
                    }).then(() => {
                        setFinished(true);

                        myRef2.current.pause();
                        myRef2.current.currentTime = 0;
                    });
                } else {
                    myRef1.current.volume = 0.3;
                    myRef1.current.pause();
                    myRef1.current.currentTime = 0;
                    myRef1.current.play();
                };

            } else {
                setTimeout(resetCards, 1200);
            };
        };
    };

    const playAgain = () => {
        setSolved([]);

        setCards(initializeDeck());

        setFinished(false);

        setClicks(1);
    };

    return (
        <div className={classes.wrapper}>
            {scores && <Highscores scores={scores} />}
            <div className={classes.container}>
                <Board
                    cards={cards}
                    flipped={flipped}
                    handleClick={handleClick}
                    disabled={disabled}
                    solved={solved}
                />
                <div className={classes.leftDiv}>
                    <div className={classes.infoDiv}>
                        <img src={tMemory} alt='memory' className={classes.title} />
                        <h3 className={classes.text}>
                            Find all the house sigil pairs and become the ruler of Westeros!
                            The best score is the lowest.
                        </h3>
                    </div>
                    <Display text={`Score: ${Math.floor(clicks / 2)}`} />
                    {gameOver &&
                        <div>
                            <Display gameOver={gameOver} text='Game Over' />
                        </div>
                    }
                    <button className={classes.button} onClick={playAgain}>
                        {gameOver ? 'Play Again' : 'Start Again'}
                    </button>
                </div>
                <audio
                    ref={myRef1}
                    src={matchSound}
                    loop={false}
                />
                <audio
                    ref={myRef2}
                    src={gotTheme}
                    loop={false}
                />
            </div>
            <UserScores scores={userScores} loggedIn={loggedIn} />
        </div>
    );
};
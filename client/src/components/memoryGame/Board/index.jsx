import React from 'react';

import Card from '../Card';

import { useStyles } from './styles';

export default function Board({ cards, flipped, handleClick, disabled, solved }) {
    const classes = useStyles();

    return (
        <div className={classes.board}>
            {
                cards.map((card, id) => <Card
                    key={id}
                    id={card.id}
                    type={card.type}
                    width={card.width}
                    height={card.height}
                    flipped={flipped.includes(card.id)}
                    handleClick={handleClick}
                    disabled={disabled || solved.includes(card.id)}
                    solved={solved.includes(card.id)}
                />)
            }
        </div>
    );
};
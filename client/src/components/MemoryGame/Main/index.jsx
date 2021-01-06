import React, { useState } from 'react';
import Card from '../Card';
import { useStyles } from './styles.js';
import got from '../../../images/got.png';
import stark from '../../../images/st.png';
import lannister from '../../../images/ln.png';
import baratheon from '../../../images/br.png';
import targaryen from '../../../images/tr.png';
import greyjoy from '../../../images/gr.png';
import arryn from '../../../images/ty.png';

export default function Main() {
    const classes = useStyles();
    const [flipped, setFlipped] = useState([]);

    const handleClick = (id) => setFlipped([...flipped, id]);

    return (
        <div>
            <h2>Can you remember all the cards?</h2>
            <Card
                id={1}
                width={100}
                height={100}
                back={got}
                front={greyjoy}
                flipped={flipped.includes(1)}
                handleClick={() => handleClick(1)}
            />
        </div>
    )
};
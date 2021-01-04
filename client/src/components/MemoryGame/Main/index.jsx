import React from 'react';
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

    const cardArray = [
        {
            name: 'stark',
            img: stark
        },
        {
            name: 'stark',
            img: stark
        },
        {
            name: 'lannister',
            img: lannister
        },
        {
            name: 'lannister',
            img: lannister
        },
        {
            name: 'baratheon',
            img: baratheon
        },
        {
            name: 'baratheon',
            img: baratheon
        },
        {
            name: 'targaryen',
            img: targaryen
        },
        {
            name: 'targaryen',
            img: targaryen
        },
        {
            name: 'greyjoy',
            img: greyjoy
        },
        {
            name: 'greyjoy',
            img: greyjoy
        },
        {
            name: 'arryn',
            img: arryn
        },
        {
            name: 'arryn',
            img: arryn
        }
    ];

    const createBoard = () => {
        return cardArray.map((item, id) => <img src={got} id={id} alt='back'/>)
    };

    return (
        <div>
            <h3>Score:<span></span></h3>
            <div className={classes.grid}>
                {createBoard()}
            </div>
        </div>
    )
}
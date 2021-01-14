import React from 'react';
import Cell from '../Cell';

export default function Stage({ stage }) {

    return (
        <div>
            {stage.map(row => row.map((cell, i) => <Cell key={i} type={cell[0]}/>))}
        </div>
    )
};
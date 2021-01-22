import React, { useState } from 'react';
import Board from '../Board';

export default function Main() {
    const [score, setScore] = useState(0);

    return (
        <div>
            <h3>score: {score}</h3>
            <Board score={score} setScore={setScore} />
        </div>
    );
};
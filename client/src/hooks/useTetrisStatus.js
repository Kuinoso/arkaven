import { set } from 'mongoose';
import { useState, useEffect, useCallback } from 'react';

export const useTetrisStatus = rowsCleared => {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [dropTime, setDropTime] = useState(null);

    const linePoints = [40, 100, 300, 1200];

    const calcScore = useCallback(() => {
        if (rowsCleared > 0) {
            setScore(prev => prev + linePoints[rowsCleared - 1]);

            setDropTime(1000 - (score / 4));

            setRows(prev => prev + rowsCleared);
        };
    }, [linePoints, rowsCleared, score]);

    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score]);

    return [score, setScore, rows, setRows, dropTime, setDropTime];
};
import React from 'react';
import Stage from '../Stage';
import Display from '../Display';
import StartButton from '../StartButton';
import { createStage } from '../gameHelpers';
import { useStyles } from './styles.js';

export default function Main() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Stage stage={createStage()} />
            <div className={classes.leftDiv}>
                <div>
                    <Display text='Score' />
                    <Display text='Rows' />
                    <Display text='Level' />
                </div>
                <StartButton />
            </div>
        </div>
    );
};
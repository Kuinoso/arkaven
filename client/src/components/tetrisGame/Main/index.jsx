import React from 'react';
import Stage from '../Stage';
import Display from '../Display';
import StartButton from '../StartButton';

export default function Main() {

    return (
        <div>
            <Stage />
            <div>
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
import React from 'react';
import { useStyles } from './styles.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';

export default function HighScores({ scores }) {
    const classes = useStyles(); 

    return (
        <div className={classes.container}>
            <h3 className={classes.title}>top scores</h3>
            <List>
                {scores.map((item, i) =>
                    <ListItem button key={i}>
                        <ListItemIcon>
                            <Avatar alt={item.name} src={item.img} />
                        </ListItemIcon>
                        <p className={classes.score}>{item.score} -</p><p className={classes.name}>{item.name}</p>
                    </ListItem>
                )}
            </List>
        </div>
    );
};
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { useStyles } from './styles.js';

export default function HighScores({ scores }) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <h3 className={classes.title}>top scores</h3>
            <List>
                {scores.map((item, i) =>
                    <Tooltip key={i} title={item.name} className={classes.pop}>
                        <ListItem button>
                            <ListItemIcon>
                                <Avatar alt={item.name} src={item.img} />
                            </ListItemIcon>
                            <p className={classes.score}>{item.score} -</p><p className={classes.name}>{item.name}</p>
                        </ListItem>
                    </Tooltip>
                )}
            </List>
        </div>
    );
};
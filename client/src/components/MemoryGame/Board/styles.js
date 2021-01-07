import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    board: {
        display: 'flex',
        flexWrap: 'wrap',
        height: 300,
        width: 400,
        margin: 'auto',
        marginTop: 10,
        marginBottom: 10,
    },
}));
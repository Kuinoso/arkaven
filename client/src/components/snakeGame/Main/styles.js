import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        margin: '50px auto',
        width: 600,
        height: 600,
        border: '2px solid white',
        backgroundColor: 'black'
    },
    score: {
        textAlign: 'center',
    },
}));
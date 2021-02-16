import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        background: '#000',
    },
    rigthNav: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 700,
    },
    games: {
        color: 'black'
    },
    gameMenu: {
        background: '#000',
        color: 'white',
    },
    userButtons: {
        display: 'flex',
        width: 200,
    },
    logButtons: {
        display: 'flex',
        width: 'min-width',
    },
    user: {
        color: 'white',
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
        fontSize: '1rem',
        textAlign: 'center',
        alignSelf: 'center',
        textDecoration: 'none',
        '&:hover': {
            color: '#A52CEE'
        },
    },
    gameButtons: {
        display: 'flex',
        width: 400,
        justifyContent: 'space-around'
    },
    navButton: {
        color: 'white',
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
        fontSize: '1rem',
        alignSelf: 'center',
        textAlign: 'center',
        margin: '0 5px',
        border: '4px solid black',
        textDecoration: 'none',
        '&:hover': {
            color: '#A52CEE'
        },
    },
    logo: {
        width: 250,
        cursor: 'pointer',
    },
}));
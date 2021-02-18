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
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'space-between',
            margin: '0 0 0 70px',
            whiteSpace: 'nowrap',
        },
    },
    logButtons: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'space-between',
            margin: '0 0 0 20px',
            whiteSpace: 'nowrap',
        },
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
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.8rem',
        },
    },
    logo: {
        width: 250,
        cursor: 'pointer',
        [theme.breakpoints.down('xs')]: {
            width: 120,
        },
    },
}));
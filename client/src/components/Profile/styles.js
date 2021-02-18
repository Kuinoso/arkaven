import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        boxSizing: 'border-box',
        width: 400,
        height: 450,
        margin: 'auto',
        marginTop: 150,
        borderRadius: 5,
        background: 'black',
        outline: 'none',
        border: '2px solid #333',
        [theme.breakpoints.down('xs')]: {
            width: 300,
            height: 300,
            marginTop: 80,
        },
    },
    name: {
        width: '85%',
        color: 'white',
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
        fontSize: '1.4rem',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            fontSize: '1rem'
        },
    },
    image: {
        width: 200,
        height: 200,
        objectFit: 'cover',
        borderRadius: '50%',
        [theme.breakpoints.down('xs')]: {
            width: 150,
            height: 150,
        },
    },
    buttons: {
        display: 'flex',
    },
    modal: {
        backgroundColor: '#A52CEE',
        color: 'white',
        width: 'min-content',
        margin: '0 5px',
        whiteSpace: 'nowrap',
        fontWeight: 'bolder',
        '&:hover': {
            backgroundColor: '#bb4efc'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.6rem'
        },
    },
}));
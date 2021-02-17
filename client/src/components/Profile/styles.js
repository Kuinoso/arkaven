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
    },
    name: {
        width: '85%',
        color: 'white',
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
        fontSize: '1.4rem',
        textAlign: 'center',
    },
    image: {
        width: 200,
        height: 200,
        objectFit: 'cover',
        borderRadius: '50%',
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
    },
}));
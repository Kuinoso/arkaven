import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 auto',
        width: 'min-content',
    },
    board: {
        position: 'relative',
        margin: '50px auto',
        width: 600,
        height: 600,
        border: '12px solid white',
        backgroundColor: 'black'
    },
    score: {
        textAlign: 'center',
    },
    leftDiv: {
        width: '100%',
        maxWidth: 200,
        padding: '50px 20px',
        marginLeft: 70,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    infoDiv: {
        boxSizing: 'border-box',
        width: 250,
        borderRadius: 20,
        color: 'white',
        background: 'black',
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
        fontSize: '1.2rem',
        outline: 'none',
        border: '4px solid #333',
        padding: '15px 10px 0 10px',
        marginBottom: 20,
    },
    button: {
        boxSizing: 'border-box',
        marginBottom: 20,
        padding: '27px 0',
        minHeight: 30,
        width: 170,
        borderRadius: 20,
        color: 'white',
        background: 'black',
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
        fontSize: '1.2rem',
        outline: 'none',
        cursor: 'pointer',
        border: '4px solid #333',
        '&:hover': {
            borderColor: 'gray'
        },
    },
    title: {
        width: 130,
    },
    text: {
        fontFamily: 'Open Sans, sans-serif',
        fontSize: '0.95rem',
    },
}));
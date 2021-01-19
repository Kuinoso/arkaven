import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: '100vw',
        height: '100vh',
    },
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: 40,
        margin: '0 auto',
        maxWidth: 900,
    },
    leftDiv: {
        width: '100%',
        maxWidth: 200,
        display: 'block',
        padding: '0 20px',
    },
    button: {
        boxSizing: 'border-box',
        marginBottom: 20,
        padding: '27px 0',
        minHeight: 30,
        width: 170,
        borderRadius: 20,
        border: 'none',
        color: 'white',
        background: '#333',
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
        fontSize: '1.2rem',
        outline: 'none',
        cursor: 'pointer',
    },
}));
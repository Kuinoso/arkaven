import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 auto',
        width: 'min-content',
    },
    board: {
        background: "#AD9D8F",
        width: "max-content",
        height: "max-content",
        margin: '100px 50px 50px 50px',
        padding: 5,
        borderRadius: 5,
    },
    leftDiv: {
        width: '100%',
        maxWidth: 200,
        display: 'block',
        padding: '0 20px',
        margin: '100px 50px 50px 50px',
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
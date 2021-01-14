import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        boxSizing: 'border-box',
        marginBottom: 20,
        padding: 20,
        minHeight: 30,
        width: '100%',
        borderRadius: 20,
        border: 'none',
        color: 'white',
        background: '#333',
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
        fontSize: '1rem',
        outline: 'none',
        cursor: 'pointer',
    },
}));
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        boxSizing: 'border-box',
        width: 300,
        height: 500,
        borderRadius: 5,
        color: 'white',
        background: 'black',
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
        fontSize: '1.2rem',
        outline: 'none',
        border: '2px solid #333',
        padding: '15px 10px 0 10px',
    },
}));
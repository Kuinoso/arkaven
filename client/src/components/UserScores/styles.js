import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        boxSizing: 'border-box',
        width: 230,
        height: 500,
        borderRadius: 5,
        color: 'white',
        background: 'black',
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
        outline: 'none',
        border: '2px solid #333',
        overflowX: 'hidden',
        overflow: 'scroll',
    },
    title: {
        padding: '0 15px'
    },
    score: {
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
        width: 70,
        textAlign: 'center'
    },
    name: {
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
    },
    text: {
        padding: 10,
        textAlign: 'center',
        marginTop: 180,
    },
}));
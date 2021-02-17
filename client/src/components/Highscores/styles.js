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
        outline: 'none',
        border: '2px solid #333',
        overflowX: 'hidden',
        overflow: 'scroll',
    },
    score: {
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
        fontSize: '0.8rem',
        width: 70,
        textAlign: 'center'
    },
    name: {
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
        fontSize: '0.8rem',
        width: 118,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',  
    },
    title: {
        padding: '0 20px'
    },
    pop: {
        cursor: 'default',
    },
}));
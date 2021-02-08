import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    textWrapper: {
        marginTop: 80
    },
    container: {
        display: 'flex',
        width: 'min-content',
        margin: 'auto',
        marginTop: 300,
    },
    image: {
        height: 50,
        backgroundColor: 'black',
        padding: 10,
        border: '5px solid #A52CEE',
        borderRadius: 20,
        margin: '0 20px',
        '&:hover': {
            border: '5px solid #c566ff',
            backgroundColor: '#333'
        },
    },
    title: {
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
        textAlign: 'center',
    },

}));
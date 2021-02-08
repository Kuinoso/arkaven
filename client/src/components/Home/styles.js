import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    textWrapper: {
        marginTop: 80
    },
    container: {
        display: 'flex',
        width: 'min-content',
        margin: 'auto',
        marginTop: 150,
    },
    image: {
        width: 200,
        margin: '5px 50px',
        border: '0.5px solid #424242',
        borderRadius: 5,
        '&:hover': {
            borderColor: '#A52CEE',
        },
    },
    title: {
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
        textAlign: 'center',
    },
}));
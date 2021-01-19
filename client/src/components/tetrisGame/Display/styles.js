import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
        padding: '10px 0',
        border: '4px solid #333',
        height: 'min-content',
        width: 160,
        borderRadius: 20,
        background: '#000',
    },
    text: {
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
        fontSize: '1.3rem',
        alignSelf: 'center',
        textAlign: 'center',
        width: '100%',
    },
}));
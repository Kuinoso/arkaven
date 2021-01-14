import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
        padding: 20,
        border: '4px solid #333',
        minHeight: 30,
        width: '100%',
        borderRadius: 20,
        background: '#000',
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
        fontSize: '0.8rem',
    },
}));
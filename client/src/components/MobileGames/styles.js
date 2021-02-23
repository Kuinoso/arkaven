import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        boxSizing: 'border-box',
        width: 300,
        margin: '150px auto',
        borderRadius: 20,
        color: 'white',
        background: 'black',
        fontFamily: 'Pixel, Arial, Helvetica, sans-serif',
        fontSize: '1.2rem',
        outline: 'none',
        border: '4px solid #333',
        textAlign: 'center',
        padding: 20,
        fontWeight: 100,
        [theme.breakpoints.up('sm')]: {
            width: 500,
            marginTop: 350,
        },
    },
}));
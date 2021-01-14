import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: 40,
        margin: '0 auto',
        maxWidth: 900,
    },
    leftDiv: {
        width: '100%',
        maxWidth: 200,
        display: 'block',
        padding: '0 20px',
    },
}));
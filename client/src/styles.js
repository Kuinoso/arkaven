import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        minHeight: '100vh',
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: '0.3',
        zIndex: -1,
    },
}));
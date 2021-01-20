import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        height: 80,
        width: 80,
        background: 'lightgray',
        margin: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 45,
        fontWeight: '800',
        color: 'white',
    },
}));
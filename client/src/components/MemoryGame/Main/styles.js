import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        width: 600,
        height: 'min-content',
        margin: 'auto',
        marginTop: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        textAlign: 'center',
    },
    firstContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    secondContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 'min-content',
        margin: 'auto'
    },
    button: {
        width: 200,
        margin: 'auto',
        marginTop: 50
    },
}));
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    board: {
        display: 'flex',
        flexWrap: 'wrap',
        height: 350,
        width: 450,
        margin: 'auto',
        marginTop: 10,
        marginBottom: 10,
        padding: 20,
        justifyContent: 'center'
    },
}));
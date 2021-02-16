import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        width: 450,
        height: 650,
        margin: 'auto',
        marginTop: 100,
        backgroundColor: 'white',
        color: 'black',
        boxShadow: theme.shadows[5],
    },
}));
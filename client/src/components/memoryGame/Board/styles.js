import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    board: {
        display: 'flex',
        flexWrap: 'wrap',
        height: 350,
        width: 450,
        margin: '50px 20px 50px 50px',
        padding: 20,
        justifyContent: 'center'
    },
}));
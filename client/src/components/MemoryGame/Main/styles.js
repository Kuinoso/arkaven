import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        height: 300,
        width: 400,
        border: '1px solid red'
    }
}));
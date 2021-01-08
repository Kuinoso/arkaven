import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    snakeFood: {
        position: 'absolute',
        width: '2%',
        height: '2%',
        backgroundColor: 'red',
        border: '1px solid white',
        zIndex: 1,
    },

}));
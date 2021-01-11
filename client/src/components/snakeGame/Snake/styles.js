import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    snakeDot: {
        position: 'absolute',
        width: '2%',
        height: '2%',
        backgroundColor: 'white',
        zIndex: 2, 
        borderRadius: '50%',    
    },
}));
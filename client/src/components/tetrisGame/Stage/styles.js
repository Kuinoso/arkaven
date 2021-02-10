import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        gridGap: '1px',
        border: '2px solid #333',
        width: 900,
        maxWidth: '25vw',
        background: '#111',
    },
}));
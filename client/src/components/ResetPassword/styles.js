import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        width: 380,
        height: 400,
        margin: 'auto',
        marginTop: 150,
        backgroundColor: 'white',
        color: 'black',
        boxShadow: theme.shadows[5],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            width: 300,
        },
    },
    fieldsContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 350,
        height: 250,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 350,
        padding: '50px 35px 0 35px',
        textAlign: 'center',
    },
    textField: {
        width: 280,
        '& label.Mui-focused': {
            color: '#A52CEE',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#A52CEE',
        },
        [theme.breakpoints.down('xs')]: {
            width: 230,
        },
    },
    textDiv: {
        width: 280,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        margin: 0,
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.3rem'
        },
    },
    subHeader: {
        fontSize: '0.75rem',
        marginTop: 8,
    },
    subLink: {
        color: '#0645AD',
        cursor: 'pointer',
        '&:hover': {
            color: '#A52CEE',
        },
    },
    resetButton: {
        backgroundColor: '#A52CEE',
        color: 'white',
        fontWeight: 'bolder',
        '&:hover': {
            backgroundColor: '#bb4efc'
        },
    },
    divider: {
        alignSelf: 'center',
        justifySelf: 'center',
        textAlign: 'center',
        fontSize: '0.8rem',
        margin: '10px 0px'
    },
    loading: {
        color: '#A52CEE',
        marginTop: 20,
    },
}));
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        width: 700,
        height: 600,
        margin: 'auto',
        marginTop: 100,
        backgroundColor: 'white',
        color: 'black',
        boxShadow: theme.shadows[5],
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            width: 300,
            marginTop: 150,
            height: 350,
        },
    },
    rightDiv: {
        width: 350,
        position: 'relative',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: '0.9'
    },
    login: {
        backgroundColor: '#A52CEE',
        color: 'white',
        fontWeight: 'bolder',
        '&:hover': {
            backgroundColor: '#bb4efc'
        },
    },
    fieldsContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 350,
        height: 350,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 50,
        [theme.breakpoints.down('xs')]: {
            width: 300,
            height: 230,
            marginTop: 0,
        },
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 280,
        padding: '90px 35px 0 35px',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            width: 300,
            padding: '20px 0',
        },
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
            width: 250
        },
    },
    textDiv: {
        width: 280,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        fontSize: '0.7rem',
        alignSelf: 'center',
    },
    header: {
        margin: 0,
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
    loading: {
        color: '#A52CEE',
        marginTop: 20,
    },
    textWrapper: {
        zIndex: 10,
        margin: '70px 0'
    },
    title: {
        textAlign: 'center',
        color: 'black',
        fontSize: '1.8rem',
    },
}));
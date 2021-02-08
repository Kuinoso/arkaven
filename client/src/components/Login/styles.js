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
    },
    rightDiv: {
        width: 350,
        position: 'relative',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
        height: 320,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 50,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 280,
        padding: '90px 35px 0 35px',
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
        alignSelf: 'start',
        marginLeft: 0,
        marginTop: 5,
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
        fontSize: '1.6rem',
    },
}));
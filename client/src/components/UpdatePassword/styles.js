import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        width: 400,
        height: 400,
        margin: 'auto',
        marginTop: 100,
        backgroundColor: 'white',
        color: 'black',
        boxShadow: theme.shadows[5],
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '35px 0',
        textAlign: 'center',
    },
    header: {
        margin: 0,
    },
    subLink: {
        fontSize: '0.75rem',
        marginTop: 8,
        color: '#0645AD',
        cursor: 'pointer',
        '&:hover': {
            color: '#A52CEE',
        },
    },
    fieldsContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 250,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    textDiv: {
        width: 280,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        marginTop: 5,
        '& label.Mui-focused': {
            color: '#A52CEE',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#A52CEE',
        },
    },
    error: {
        color: 'red',
        fontSize: '0.7rem',
        alignSelf: 'start',
        marginLeft: 33,
        marginTop: 3,
    },
    loading: {
        color: '#A52CEE',
        marginTop: 20,
    },
    submit: {
        backgroundColor: '#A52CEE',
        color: 'white',
        fontWeight: 'bolder',
        marginTop: 20,
        '&:hover': {
            backgroundColor: '#bb4efc'
        },
    },
}));
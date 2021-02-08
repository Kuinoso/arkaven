import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        width: 550,
        height: 450,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        color: 'black',
        margin: 'auto',
        marginTop: 120,
        paddingBottom: 20,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 500,
        padding: '35px 35px 0 35px',
        textAlign: 'center',
    },
    fieldsContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 400,
        height: 450,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
    },
    textDiv: {
        width: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    textField: {
        width: 350,
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
        marginTop: 3,
    },
    button: {
        backgroundColor: '#A52CEE',
        color: 'white',
        fontWeight: 'bolder',
        marginTop: 20,
        '&:hover': {
            backgroundColor: '#bb4efc'
        },
    },
    loading: {
        color: '#A52CEE',
        marginTop: 20,
    },
}));
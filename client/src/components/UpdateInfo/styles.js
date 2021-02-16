import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        width: 400,
        height: 500,
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
    fieldsContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 200,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: 150,
        height: 150,
        objectFit: 'cover',
        borderRadius: '50%',
        border: '0.2px solid gray',
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
    fileInput: {
        display: 'none',
    },
    fileButton: {
        backgroundColor: 'white',
        borderRadius: '50%',
        cursor: 'pointer',
        width: 35,
        height: 35,
        position: 'absolute',
        zIndex: 1,
        top: 110,
        right: 125,
        '&:hover': {
            color: '#A52CEE',
        },
    },
    textDiv: {
        width: 280,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        '& label.Mui-focused': {
            color: '#A52CEE',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#A52CEE',
        },
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
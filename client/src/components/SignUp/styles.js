import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        width: 700,
        height: 640,
        margin: 'auto',
        marginTop: '5vh',
        backgroundColor: 'white',
        color: 'black',
        boxShadow: theme.shadows[5],
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            width: 300,
            marginTop: 50,
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
        opacity: '0.9',
    },
    login: {
        backgroundColor: '#A52CEE',
        color: 'white',
        fontWeight: 'bolder',
        marginTop: 20,
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
        [theme.breakpoints.down('xs')]: {
            width: 300,
            height: 300
        },
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 280,
        padding: '35px 35px 0 35px',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            width: 300,
            padding: '20px 0',
        },
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 280,
        padding: '0 35px',
        alignItems: 'center',
        position: 'relative',
        marginTop: 20,
        [theme.breakpoints.down('xs')]: {
            width: 300,
            padding: 0,
            marginTop: 0,
        },
    },
    textField: {
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
    image: {
        width: 150,
        height: 150,
        objectFit: 'cover',
        borderRadius: '50%',
        border: '0.2px solid gray',
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
        top: 120,
        right: 110,
        '&:hover': {
            color: '#A52CEE',
        },
        [theme.breakpoints.down('xs')]: {
            right: 90,
            width: 40,
            height: 40,
        },
    },
    load: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    message: {
        fontSize: '0.75rem',
        color: '#A52CEE',
        textAlign: 'center',
    },
}));
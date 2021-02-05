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
        justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: '0.8',
    },
    button: {
        position: 'relative',
        backgroundColor: 'black',
        width: 250,
        height: 250,
        margin: 'auto',
        borderRadius: '50%',
    },
    buttonImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: '0.8',
        borderRadius: '50%',
    },
    fieldsContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 350,
        height: 300,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 280,
        padding: '35px 35px 0 35px',
        textAlign: 'center',
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 280,
        padding: '0 35px',
        alignItems: 'center',
        position: 'relative',
        marginTop: 20,
    },
    textField: {
        width: 280,
        '& label.Mui-focused': {
            color: '#B414F5',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#B414F5',
        },
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
            color: '#B414F5',
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
            color: '#B414F5',
        },
    },
}));
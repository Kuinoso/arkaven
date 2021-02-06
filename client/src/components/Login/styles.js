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
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: '0.9',
    },
    button: {
        position: 'relative',
        cursor: 'pointer',
        backgroundColor: 'black',
        width: 200,
        height: 200,
        margin: 'auto',
        borderRadius: '50%',
        '&:hover': {
            boxShadow: '1px 0px 5px 8px rgba(180,20,245,0.37);',
        },
    },
    buttonOff: {
        position: 'relative',
        backgroundColor: 'black',
        width: 200,
        height: 200,
        margin: 'auto',
        borderRadius: '50%',
    },
    buttonImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '50%',
    },
    load: {
        position: 'relative',
        backgroundColor: 'black',
        width: 200,
        height: 200,
        margin: 'auto',
        borderRadius: '50%',
    },
    fieldsContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 350,
        height: 200,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 280,
        padding: '130px 35px 0 35px',
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
}));
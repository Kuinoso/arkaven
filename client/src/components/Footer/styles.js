import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 1,
        color: 'white',
        marginTop: 100,
        opacity: '0.8'
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: '#000',
        paddingBottom: 5,
    },
    footerDiv: {
        display: 'flex',
        alignItems: 'center',
        marign: 'auto'
    },
    logo: {
        width: 80,
        marginRight: 8
    },
    text: {
        alignSelf: 'center',
        fontSize: '0.8rem',
    },
    gitLogo: {
        cursor: 'pointer',
        color: 'white'
    },
}));
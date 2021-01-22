import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    block: {
        height: 80,
        width: 80,
        background: "lightgray",
        margin: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 25,
        fontWeight: "800",
        color: "white",
    },
}));
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    newGameButton: {
        padding: 10,
        background: "#846F5B",
        color: "#F8F5F0",
        width: 95,
        borderRadius: 7,
        fontWeight: "900",
        marginLeft: "auto",
        marginBottom: "auto",
        cursor: "pointer",
    },
    tryAgainButton: {
        padding: 10,
        background: "#846F5B",
        color: "#F8F5F0",
        width: 80,
        borderRadius: 7,
        fontWeight: "900",
        cursor: "pointer",
        margin: "auto",
        marginTop: 20,
    },
    gameOverOverlay: {
        position: "absolute",
        height: "100%",
        width: "100%",
        left: 0,
        top: 0,
        borderRadius: 5,
        background: "rgba(238,228,218,.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));
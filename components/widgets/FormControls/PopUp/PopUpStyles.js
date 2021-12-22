import {makeStyles} from "@mui/styles";

export const PopUpStyles = makeStyles(theme => ({
    root: {
        boxShadow: "none",
        borderRadius: "0",
    },
    paper:{
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.custom_paper,
    },
    dialogWrapper: {
        position: "absolute",
        top: theme.spacing(5),
    },
    titleContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center"
    }
}));
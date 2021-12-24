import { makeStyles } from "@mui/styles";

export const AllUsersStyles = makeStyles(theme => ({
    employeePageContent: {
        margin: theme.spacing(3),
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(0),
        padding: theme.spacing(3),
    },
    searchInput: {
        width: '75%',
    },
    newButton: {
        position: "absolute",
        right: "10px",
    }
})
);
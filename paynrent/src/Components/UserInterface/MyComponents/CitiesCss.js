import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    mainContainer: {
        width: "100%",
        color: "#fff",
    },

    subContainer: {
        borderRadius: "12px",
        boxShadow: "0 2px 2px 0 rgb(0 0 0 / 7%)",
        backgroundColor: "#2a2b36",
        width:'96%',
        padding:10,
          },

    heading: {
        color: "#fff",
        fontSize: 28,
        fontWeight: 700,
        marginBottom: 16,
    },

    citiesContainer: {
        marginBottom: "1rem",
        textAlign: "left",
        display: "grid",
        gridTemplateColumns: "auto auto auto",
    },

    citiesCol: {
        position: "relative",
        width: "100%",
        margin: 8,
        padding: "0 2px",
        boxSizing: "border-box",
        display: "block",
    },

    mainList: {
        listStyle: "none",
        margin: "auto",
        padding: "0 0 0 15px",
    },

    subList: {
        fontSize: 16,
    },

    item: {
        color: "#636e72",
        textDecoration: "none",
    },

    hover: {
        "&:hover": {
            color: "#ffffff",
        },
        color: "#636e72",
        textDecoration: "none",
    },
});

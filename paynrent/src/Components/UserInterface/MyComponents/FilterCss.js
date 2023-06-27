import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    mainContainer: {
        marginTop: 5,
        background:'#fff',
        padding:'0px 30px 0px 30px'
    },

    subContainer: {
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: 18,
    },

    heading: {
        fontSize: 22,
        fontFamily: "Poppins",
        fontWeight: 600,
        color: "#384150",
    },

    text: {
        fontSize: 16,
        color: "#0EBABA",
        fontFamily: "Poppins",
        marginTop: 4,
        cursor: "pointer",
    },

    box: {
       
        borderTopRightRadius: 4,
        marginTop: 24,
    },

    filterOptionHeader: {
        fontFamily: "Poppins",
        fontSize: 16,
        color: "#000",
        fontWeight: 600,
        padding: "10px 15px 13px 0",
        clear: "both",
        paddingLeft: 18,
    },

    items: {
        paddingLeft: 18,
        fontFamily: "Poppins",        
    }
})

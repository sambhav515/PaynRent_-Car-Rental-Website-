import { makeStyles} from "@mui/styles";
import { findByLabelText } from "@testing-library/react";
export const useStyles=makeStyles({

    mainContainer:{
        display:'flex',
        paddingLeft:'20%',
        width:'100vw',
        height:'100vh',

    },
    box:{
        width:'50%',
        height:'50%',
        padding:10,
        borderRadius:10,
        marginTop:'5%',
        background:'#fff'
 
    },
    headingText:{
        fontWidth:24,
        fontWeight:'bold',
        letterspacing:1,
        paddingTop:5,
        paddingBottom:5

        
    },
    center:{
        display:'flex',
        justifyContent:'center',
        alignItem:'center',  
    }
})
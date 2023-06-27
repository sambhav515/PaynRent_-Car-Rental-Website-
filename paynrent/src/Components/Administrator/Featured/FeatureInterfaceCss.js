import { makeStyles,} from "@mui/styles";
export const useStyles=makeStyles({
    mainContainer:{
        display:'flex',
        width:'100vw',
        height:'100vh',
        paddingLeft:'20%'
    },

    box:{

        width:'40%',
        height:250,
        padding:10,
        borderRadius:10,
        background:'#fff'

    },
    headingStyle:{
       fontWidth:24,
       fontWeight:'bold',
       letterSpacing:1,
       paddingTop:5,
       paddingBottom:5

    },

    center:{
        display:'flex',
        justifyContent:'left',
        alignItems:'center',
        flexDirection:'row'
    }
    
})
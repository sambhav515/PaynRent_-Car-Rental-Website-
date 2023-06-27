import { makeStyles,} from "@mui/styles";
export const useStyles=makeStyles({
    
    box:{

        width:'90%',
        height:200,
        padding:10,
        borderRadius:10,
        marginTop:'5%',
        background:'#fff'

    },
    dialogContainer:{
        display:'flex',
        justifyContent:'center',
        alignItem:'center',
        background:'#ecf0f1',
        width:'100vw',
        height:'100vh'
    },

    dialogBox:{

        width:'60%',
        height:540,
        padding:10,
        borderRadius:10,
        marginTop:'5%',
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
        justifyContent:'center',
        alignItems:'center'
    }
})
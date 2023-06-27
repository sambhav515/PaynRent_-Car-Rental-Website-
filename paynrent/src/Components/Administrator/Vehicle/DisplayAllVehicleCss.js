import { makeStyles,} from "@mui/styles";
export const useStyles=makeStyles({
    
    box:{

        width:'100%',
        height:200,
        padding:10,
        borderRadius:10,
        marginTop:'5%',
        background:'#fff'

    },
    dialogContainer:{
        display:'flex',
        width:'80%',
        height:'100%',
        paddingLeft:'8%'
      },
      dialogBox:{
        width:'100%',
        height:50,
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
        alignItems:'center'
    }
})
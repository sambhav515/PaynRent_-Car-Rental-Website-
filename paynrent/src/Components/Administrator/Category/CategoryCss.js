import { makeStyles } from "@mui/styles";
import { flexbox } from "@mui/system";
export const useStyles=makeStyles({
mainContainer:{
  display:'flex',
  justifyContent:'center',
  alignItem:'center',
  background:'#ecf0f1',
  width:'100vw',
  height:'100vh'


},
box:{
  width:'40%',
  height:250,
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
center:{display:'flex',
justifyContent:'left',
alignItem:'center',
flexDirection:'row'
}

})

import {useEffect,useState} from "react"
import {Box,Divider,Paper,TextField} from '@mui/material'
import { LocationOn } from "@mui/icons-material"
import Button from '@mui/material/Button';
import {getData,ServerURL} from '../../Services/FetchNodeServices' 
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
 
import ListItemText from '@mui/material/ListItemText';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import DateDiff from "date-diff";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
 import { useNavigate } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
 

export default function SearchComponent(props){
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [selectedCity,setSelectedCity]=useState('Gwalior')
  const [startTime,setStartTime]=useState("")
  const [endTime,setEndTime]=useState("")
  const [cities,setCities]=useState([])
  const [open,setOpen]=useState(false)
  const [daysTime,setDaysTime]=useState('')
  const [days,setDays]=useState('')
  const [hrs,sethrs]=useState('')
  var dispatch=useDispatch()
  var navigate=useNavigate()
 
 
  const fetchAllCities=async()=>{
  var response=await getData('user/display_all_cities')
  console.log(response.data)
  setCities(response.data)
  }
  const handleCitySelect=(cityselected)=>{

    setSelectedCity(cityselected)
    setOpen(false)
  }
  const showTopCity=()=>{
   return cities.map((item)=>{
    return   (<>
         {item.status=='Top City'?<ListItem  button >
            <ListItemText  primary={<span style={{fontSize:18,fontWeight:'bold'}}>{item.cityname}</span>} onClick={()=>handleCitySelect(item.cityname)} />
            </ListItem>:<></>}</>)

   })

  } 

  const showOtherCity=()=>{
    return cities.map((item)=>{
     return   (<>
          {item.status=='Other City'?<ListItem  button >
             <ListItemText style={{fontSize:18,fontWeight:'bold'}} primary={item.cityname} onClick={()=>handleCitySelect(item.cityname)} />
             </ListItem>:<></>}</>)
 
    })
 
   } 
 useEffect(function(){
fetchAllCities()

 },[])




  const handleCityDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const cityDialog=()=>{
    return (
      <div>
        
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: { borderRadius: 20 }
          }}

           >
         <DialogTitle sx={{ m: 0, p: 2 }} >
      {"Select your city"}
      
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      
    </DialogTitle>
 
          <Divider/>
          <DialogContent style={{width:350}}>
          <List>  
            <div>Top Cities</div>
          {showTopCity()}
          <Divider />
          <div>Other City</div>
          {showOtherCity()}
          </List>
          </DialogContent>
          </Dialog>
      </div>
    );
  }

  
  
  const handleSetStartTimeValue=(newValue)=>{
    
    setStartTime(newValue);
  
    
  }
  

  const handleSetEndTimeValue=(newValue)=>{
   
   setEndTime(newValue);
   dateDiff(newValue)
    
  }
  const dateDiff=(et)=>{
    var startDay = new Date(startTime);
    var endDay = new Date(et);
    var diff=new DateDiff(endDay,startDay)
    setDays(parseInt(diff.days()))
    sethrs(Math.ceil(diff.hours()%24))
    setDaysTime("Duration "+parseInt(diff.days())+" Days "+Math.ceil(diff.hours()%24)+" Hrs");

  }

  const handleClick=()=>{
   if((days>=0 && hrs>0) ||(days>0 && hrs>=0)){
    dispatch({type:'ADD_BOOKING',payload:{city:selectedCity,starttime:startTime,endtime:endTime,duration:daysTime,days:days,hrs:hrs}})
    navigate('/vehicledetails') 
   }
   else{
    alert("Invalid date/time pls choose correct date & time....")
   }

  }


 return(
 <div style={{position:'relative'}}>
     <img src='/assets/slide1.png'  style={{width:'100%'}}/ >
     <div style={{ position:'absolute',left:matches?'2%':'5%',top:'4%'}}>
      <Paper elevation={3} style={{  display:'flex',alignItems:'center', padding:10,borderRadius:15,width:"100%",height:'auto',flexDirection:'column'}}>
        {matches?<></>:
        <div style={{position:'relative',background:'#f39c12',width:480,height:90,borderRadius:15}}>
          <div style={{position:'absolute',left:'5%',top:'15%'}}>
          <div style={{position:'relative'}}>
            <img src='/assets/message.png'  style={{width:220,height:85}} />
            <div style={{position:'absolute',left:'30%',top:0,fontSize:24,fontWeight:'bolder'}}>Rentals</div>
            <div style={{position:'absolute',left:'22%',top:'32%',fontSize:16,fontWeight:'500',color:'#7f8c8d'}}>For hours & days</div>
          </div>
          </div>
     
          <div style={{position:'absolute',left:'50%',top:1}}>
          <div style={{width:220,height:85,padding:5,flexDirection:'column',display:'flex',alignItems:'center',justifyContent:'center'}}>
             <div style={{fontSize:24,fontWeight:'bolder',color:'#FFF'}}>Subscriptions</div>
            <div style={{fontSize:16,fontWeight:'500',color:'#FFF'}} >For month & year</div>
            </div>  
          </div>  
        
         </div>
                 }
           <div>
            <img src='/assets/Rentals2.png' style={{width:120,marginTop:'20%'}}/>
           </div>
           <div style={{fontSize:20,fontWeight:600,color:'#7f8c8d',marginTop:'2%'}}>
            Self drive car rental in india
           </div>
           <div onClick={handleCityDialog}  style={{cursor:'pointer', marginTop:'5%',padding:10,alignItems:'center',display:'flex',width:400,height:40,borderRadius:15,border:'1px solid #bdc3c7'}}>
            <LocationOn /> 
            <span style={{paddingLeft:20,fontSize:18,fontWeight:600}}>{selectedCity}</span>
            </div> 
            <div style={{display:'flex',width:420,justifyContent:'space-between'}}>
            <div    style={{cursor:'pointer', marginTop:'5%',padding:10,alignItems:'center', display:'flex',width:180,height:40,borderRadius:15,border:'1px solid #bdc3c7'}}>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      
             <MobileDateTimePicker
             
       label={<span style={{fontSize:18,fontWeight:600,color:'#7f8c8d'}}>Start Time</span>}
       InputProps={{
        disableUnderline: true,
            }}
        value={startTime}
        onChange={(newValue) =>{handleSetStartTimeValue(newValue)}}
        
        renderInput={(params) =><TextField variant="standard" {...params}/>  }
       
      />
       </LocalizationProvider>  
       
            </div>
            <div   style={{cursor:'pointer', marginTop:'5%',padding:10,alignItems:'center',display:'flex',width:180,height:40,borderRadius:15,border:'1px solid #bdc3c7'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <MobileDateTimePicker
      
label={<span style={{fontSize:18,fontWeight:600,color:'#7f8c8d'}}>End Time</span>}
InputProps={{
 disableUnderline: true,
     }}
 value={endTime}
 onChange={(newValue) =>{handleSetEndTimeValue(newValue)}}
 
 renderInput={(params) =><TextField variant="standard" {...params}/>  }

/>
</LocalizationProvider>  
            </div>
            </div>  

            <div style={{color:'#7f8c8d',fontWeight:600,fontSize:16,marginTop:10}}>
             {daysTime}
            </div>
            <div onClick={handleClick}   style={{ cursor:'pointer',background:'#f39c12', marginTop:'5%',padding:10,alignItems:'center',justifyContent:'center',display:'flex',width:380,height:40,borderRadius:20}}>
             <span style={{fontSize:24,fontWeight:'bolder',color:'#FFF'}}>Search</span>
            </div>  
         

        </Paper>

       </div> 
       {cityDialog()}
    
    </div>

)

}
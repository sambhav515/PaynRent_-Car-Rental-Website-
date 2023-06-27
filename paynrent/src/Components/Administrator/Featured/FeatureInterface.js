import {useEffect,useState} from "react";
import {Grid,TextField,Button,Avatar}  from "@mui/material";
import { useStyles } from "./FeatureInterfaceCss";
import {getData,ServerURL,postData} from "../../Services/FetchNodeServices"
import Swal from "sweetalert2";
export default function FeatureInterface(props){
    const classes=useStyles();
    var  [icon,setIcon]=useState({filename:'/assets/defaultcar.png',bytes:''})
    var  [link,setLink]=useState('')
    const handlePicture=(event)=>{
        setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]}) 
       
       
        }
    const handleSubmit=async()=>{
        var formData=new FormData()
        formData.append('icon',icon.bytes)
        formData.append('link',link)
        var response=await postData('feature/featuresubmit',formData)
        if(response.status)
        {
         Swal.fire({
           icon: 'success',
           title: 'Done',
           text: 'feature Submitted Successfully'
           
         })
     
        }
 
        

else
   {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    
    })

   }

 }
 const clearValues=()=>{
    setLink('')
    setIcon({filename:'',bytes:''})
  
  }

 return(<div className={classes.mainContainer}>
    <div className={classes.box}>
    <Grid container spacing={2}>
        <Grid item xs={12} className={classes.headingStyle}>
        <div className={classes.center}>
             

              <div style={{ marginLeft: 5 }}>Feature Interface</div>
            </div>
          </Grid>
    

    <Grid item xs={12}>
            <TextField onChange={(event)=>setLink(event.target.value)} label="Link" fullWidth />

        </Grid>
    <Grid item xs={6} >
        <Button fullWidth variant="contained" component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" onChange={handlePicture}/>
      </Button>
        </Grid>

        <Grid item xs={6} className={classes.center}>
        <Avatar
        alt="Feature Icon"
        src={icon.filename}
        variant="rounded"
        sx={{ width: 250, height: 56 }}
        />
        </Grid>

        <Grid item xs={6}>
        <Button onClick={handleSubmit} variant="contained" fullWidth>
            Submit
         </Button>   
        
        
        </Grid>

        <Grid item xs={6}>
              
              <Button  onClick={clearValues} variant="contained" fullWidth >
                  Reset
              </Button>    
</Grid>
            
          </Grid>

        </div>
</div>)
       
 
 } 
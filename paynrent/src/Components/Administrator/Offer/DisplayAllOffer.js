import MaterialTable from "@material-table/core";
import {useState,useEffect} from "react";
import { Avatar,Button,TextField,Grid } from "@material-ui/core";
import { useStyles } from "../Category/DisplayAllCategoryCss";
import { useNavigate } from "react-router-dom";

import { getData,postData,ServerURL} from "../../Services/FetchNodeServices";
import Swal from "sweetalert2";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';



export default function DisplayAllCategory(props){
  var classes=useStyles()
  var navigate = useNavigate()
  var [image,setImage]= useState({filename:'/assest/oldcarx.png',bytes:''})
  var [prevIcon,setPrevIcon]= useState('')
  var [oldIcon,setOldIcon]= useState('')


var [title,setTitle]=useState('')
var [description,setDescription]=useState('')

var [offerID,setOfferID]=useState('')
var [buttonStatus,setButtonStatus ]=useState({upload:true})


const [offer,setOffer]=useState([])  
const [open,setOpen]=useState(false)

const fetchAllOffer=async()=>{
    var result=await getData('userinterface/display_all_offer')
      setOffer(result.data)
      }
      useEffect(function(){
      fetchAllOffer()
      },[])
 
 const handleSetDataForDialog=(rowData)=>{
  setOfferID(rowData.offerid)
  setTitle(rowData.title)
  setDescription(rowData.description)
  setOldIcon(rowData.image)

  setImage({filename:`${ServerURL}/images/${rowData.image}`,bytes:''})
  setPrevIcon(`${ServerURL}/images/${rowData.image}`)

  setOpen(true)
 }


const handleDiscard=()=>{
setImage({filename:prevIcon,bytes:''})
setButtonStatus({upload:true})
}


const handleSavePicture=async()=>{
var formData = new FormData()
formData.append('offerid',offerID)
formData.append('oldicon',oldIcon)
formData.append('image',image.bytes)
  var response = await postData('offer/edit_picture',formData) 
  if(response.status)
  {
     Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Icon Update Successfully',
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
  setButtonStatus({upload:true})
  setOpen(false)
  fetchAllOffer()
}

// handleDeleteButton//
const handleDelete=async()=>{
  var body = {offerid:offerID,oldicon:oldIcon}
    var response = await postData('offer/delete_data',body) 
    if(response.status)
    {
       Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'offer Deleted Successfully',
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
  setOpen(false)
    fetchAllOffer()
  }
//End-handleDeleteButton//
 
// handleEditDataButton//
const handleEditData=async()=>{
    var body = {title:title,description:description,offerid:offerID}
      var response = await postData('offer/edit_data',body) 
      if(response.status)
      {
         Swal.fire({
            icon: 'success',
            title: 'Done',
            text: 'offer Update Successfully',
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
    setOpen(false)
      fetchAllOffer()
    }
//End-handleEditDataButton//

// handlePictureButton//
const showHidePictureButtons=()=>{
return(
  <div>
    {buttonStatus.upload?<><Button variant="contained" component="label" fullWidth>Upload<input onChange={handlePicture} hidden accept="image/*" multiple type="file" />
</Button></>:<><Button onClick={handleSavePicture} color="primary">Save</Button><Button onClick={handleDiscard} color="secondry">Discard</Button></>}
  </div>
)

}
//END-handlePictureButton//




// table//
    function displayCategories() {
        return (
          <MaterialTable
            title="List of Offer"
            columns={[
              { title: 'Offer Id', field: 'offerid' },
              { title: 'Title', field: 'title' },
              { title: 'Description', field: 'description' },
             
              { title: 'image', field: 'image',
              render:(rowData)=><Avatar src={`${ServerURL}/images/${rowData.image}`} style={{width:60,height:40}} variant="rounded" /> },
             
            ]}
            data={offer}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Categories', 
                onClick: (event, rowData) => handleSetDataForDialog(rowData)
              },
            
              {
                icon: 'add',
                tooltip: 'Add Category', 
                isFreeAction:true,
                onClick:(event)=> navigate('/dashboard/offer')
              }
            
            
            
            ]}
          />
        )
      }
// end- table//
 
 
      const handleClose=()=>
      {
        setOpen(false)
      }
     
      const handlePicture=(event)=>{
      setImage({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      setButtonStatus({upload:false})
        }


const showDialog=()=>{
return(
<div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
    <div className={classes.box}>

 
   <Grid container spacing={2}>
    <Grid item xs={12} className={classes.headingStyle}>
     Offer Interface
    </Grid>

   
   <Grid item xs={12}>
    <TextField value={title} onChange={(event)=>setTitle(event.target.value)}  label="Title " fullWidth  />
   </Grid>

   <Grid item xs={12}>
    <TextField value={description} onChange={(event)=>setDescription(event.target.value)}  label="Description " fullWidth  />
   </Grid>

   <Grid item xs={6}>
  {showHidePictureButtons()}
   </Grid>
    
   <Grid item xs={6} className={classes.center}>
   <Avatar
        alt="offer Image"
        src={image.filename}
        variant="rounded"
        style={{ width: 80, height: 56 }}
      />

   </Grid>
   <Grid item xs={6}>
<Button onClick={handleEditData} variant="contained" fullWidth>
Edit
</Button>
   </Grid>

 <Grid item xs={6}>
    <Button onClick={handleDelete} variant="contained" fullWidth>
  Delete
</Button>
   </Grid>



</Grid>
   </div>

        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>

) 

}




    return(
        <div className={classes.dialogContainer}>
       <div className={classes.dialogBox}>
       {displayCategories()}
        </div>
      {showDialog()}
         </div>
       )
}
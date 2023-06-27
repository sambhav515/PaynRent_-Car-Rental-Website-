import MaterialTable from "@material-table/core";
import {useState,useEffect} from "react"
import { Avatar,Button,TextField,Grid } from "@material-ui/core";
import {useStyles} from "./DisplayAllCategoryCss"
import { getData,isValidAuth,postData,ServerURL } from "../../Services/FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DisplayAllCategory(props){
  var classes=useStyles()
  var navigate=useNavigate()
   const [category,setCategory]=useState([])
   var  [icon,setIcon]=useState({filename:'/assets/defaultcar.png',bytes:''})
   var  [prevIcon,setPrevIcon]=useState('')
   var   [oldIcon,setOldIcon]=useState('')
 var  [categoryName,setCategoryName]=useState('')
 var  [categoryID,setCategoryID]=useState('')
 var  [buttonStatus,setButtonStatus]=useState({upload:true})


   const [open,setOpen]=useState(false)
   const fetchAllCategory=async()=>{
    var result=await getData('category/display_all_category')
    setCategory(result.data)
   }

   const checkAuth=async()=>{
    var result=await isValidAuth()
   
    if(result.auth)
    { fetchAllCategory()}
    else
    {
      alert(result.message)
    }

   }
   useEffect(function(){
   // fetchAllCategory()
   checkAuth()
   },[])

 const handleSetDataForDialog=(rowData)=>{
 setCategoryID(rowData.categoryid) 
 setCategoryName(rowData.categoryname)
 setOldIcon(rowData.icon)
 setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
 setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
 setOpen(true)


 }

 const handleDiscard=()=>{
  setIcon({filename:prevIcon,bytes:''})
  setButtonStatus({upload:true})
 }

 const handleSavePicture=async()=>{
  var formData=new FormData()
  formData.append('categoryid',categoryID)
  formData.append('oldicon',oldIcon)
  formData.append('icon',icon.bytes)
  var response=await postData('category/edit_picture',formData)
  if(response.status)
  {
   Swal.fire({
    
     icon: 'success',
     title: 'Done',
     text: 'Icon Updated Successfully'
     
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
  fetchAllCategory()
 }



 const handleEditData=async()=>{
  var body={categoryname:categoryName,categoryid:categoryID}
  var response=await postData('category/edit_data',body)
  if(response.status)
  {
   Swal.fire({
    
     icon: 'success',
     title: 'Done',
     text: 'Category Updated Successfully'
     
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
  fetchAllCategory()
 }


 const handleDelete=async()=>{
  var body={categoryid:categoryID,oldicon:oldIcon}
  var response=await postData('category/delete_data',body)
  if(response.status)
  {
   Swal.fire({
    
     icon: 'success',
     title: 'Done',
     text: 'Category Deleted Successfully'
     
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
  fetchAllCategory()
 }








 const showHidePictureButtons=()=>
 {
    return(<div>
       {buttonStatus.upload?<><Button fullWidth variant="contained" component="label">
        Upload
        <input  onChange={handlePicture}  hidden accept="image/*" multiple type="file" />
      </Button></>:<><Button onClick={handleSavePicture} color="primary">Save</Button><Button onClick={handleDiscard} color="secondary">Discard</Button></>}
      

    </div>)
 }




    function displayCategories() {
        return (
 
          <MaterialTable
            title="List of categories"
            columns={[
              { title: 'Category Id', field: 'categoryid' },
              { title: 'Name', field: 'categoryname' },
              { title: 'Icon', field: 'icon',render:(rowData)=><Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{width:40,height:40}} variant="rounded" />},
            ]}
            data={category}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Category',
                onClick: (event, rowData) => handleSetDataForDialog(rowData)},
                {
                  icon: 'add',
                  tooltip: 'Add Category',
                  isFreeAction: true,
                  onClick: (event) =>navigate('/dashboard/category')
                }
            ]}
          />
        )
      }
const handleClose=()=>
{
setOpen(false)

}

const handlePicture=(event)=>{
setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
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
         Category Interface   

        </Grid>
        <Grid item xs={12}>
            <TextField value={categoryName} onChange={(event)=>setCategoryName(event.target.value)}  label="Category Name" fullWidth />

        </Grid>
        <Grid item xs={6} >
        {showHidePictureButtons()}

        </Grid>
      

        <Grid item xs={6} className={classes.center}>
        <Avatar
        alt="Category Icon"
        src={icon.filename}
        variant="rounded"
        sx={{ width: 120, height: 56 }}
      />
        </Grid>
        <Grid item xs={6}>
        <Button  onClick={handleEditData} variant="contained" fullWidth>
            Edit Data
         </Button>   
        
        
        </Grid>

            <Grid item xs={6}>
              
                <Button onClick={handleDelete}  variant="contained" fullWidth >
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
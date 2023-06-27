import MaterialTable from "@material-table/core";
import {useState,useEffect} from "react"
import { Avatar,Button,TextField,Grid} from "@mui/material";
import { getData,postData, ServerURL } from "../../Services/FetchNodeServices";
import {useStyles} from "./DisplayAllCompanyCss"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { style } from "@mui/system";
import { upload } from "@testing-library/user-event/dist/upload";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function DisplayAllCompany(props){
   const classes=useStyles();
   const navigate= useNavigate()
   const [company,setCompany]=useState([])
   var  [icon,setIcon]=useState({filename:'/assets/defaultcar.png',bytes:''})
   var [prevIcon,setPrevIcon]=useState('')
   var [oldIcon,setOldIcon]=useState('')
   var [categoryId,setCategoryId]=useState('')
   var [subcategoryId,setSubCategoryId]=useState('')
   var [companyId,setCompanyId]=useState('')
   var [companyName,setCompanyName]=useState('')
   var [categoryList,setCategoryList]=useState([])
   var [subCategoryList,setSubCategoryList]=useState([])
   
   var[buttonStatus,setButtonStatus]=useState({upload:true})
   const [open,setOpen]=useState(false)
   const fetchAllCompany=async()=>{
    var result=await getData('company/display_all_company')
    setCompany(result.data)
   }

   const fetchAllCategory=async()=>{
    var result=await getData('category/display_all_category')
    setCategoryList(result.data)
   }
   const fetchAllSubCategory=async()=>{
    var result=await getData('subcategory/display_all_subcategory')
    setSubCategoryList(result.data)
   }
   useEffect(function(){
    fetchAllCompany()
   },[])

   const fillCategoryDropDown=()=>{
    return categoryList.map((item)=>{

       return (
               <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>

       )

    })
  }

  const fillSubCategoryDropDown=()=>{
    return subCategoryList.map((item)=>{
  
      return(
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      )
    })
  }
  const fetchAllSubcategoryByCategory=async(category_id)=>{
    var body={categoryid:category_id}
    var response=await postData('subcategory/fetch_all_subcategory_by_category',body)
    setSubCategoryList(response.result)
 }

   const handleSetDataForDialog=(rowData)=>{
    fetchAllCategory()
    fetchAllSubCategory()
    setCompanyId(rowData.companyid)
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setCompanyName(rowData.companyname)
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
   formData.append('companyid',companyId)
   formData.append('oldicon',oldIcon)
   formData.append('icon',icon.bytes)
   var response=await postData('company/edit_picture',formData)
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
   fetchAllCompany()


 

 
   }

   const handleEditData=async()=>{
    var body={companyname:companyName,categoryid:categoryId,subcategoryid:subcategoryId,}
    var response=await postData('company/edit_data',body)
    if(response.status)
    {
     Swal.fire({
       icon: 'success',
       title: 'Done',
       text: 'Company Updated Successfully'
       
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
    fetchAllCompany()
 
 
  
 
  
    }

    const handleDelete=async()=>{
      var body={companyid:companyId,oldicon:oldIcon}
      var response=await postData('company/delete_data',body)
      if(response.status)
      {
       Swal.fire({
         icon: 'success',
         title: 'Done',
         text: 'Company Deleted Successfully'
         
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
      fetchAllCompany()
   
   
    
   
    
      }
   const showHidePictureButtons=()=>
   {
    return (<div>
      {buttonStatus.upload?<><Button fullWidth variant="contained" component="label">
        Upload
        <input onChange={handlePicture} hidden accept="image/*" multiple type="file"  />
      </Button></>:<><Button onClick={handleSavePicture} color="primary">Save</Button><Button onClick={handleDiscard}  color="secondary">Discard</Button></>}

    </div>)
   }

   const handleClose=()=>{
    setOpen(false)
   }
   
   const handlePicture=(event)=>{
     setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
     setButtonStatus({upload:false})
   
   }

   const handleChange=(event)=>{
    setCategoryId(event.target.value)
    fetchAllSubcategoryByCategory(event.target.value)
    }

    const handleSubCategoryChange=(event)=>{
      setSubCategoryId(event.target.value)
      }


   

    function displayCompany() {
        return (
          <MaterialTable
            title="List of companies"
            columns={[
              { title:'Company Id', field: 'companyid' },
              { title: 'Category Id', field: 'categoryid' },
              { title: 'SubCategory Id', field: 'subcategoryid' },
              { title: 'Name', field: 'companyname' },
              { title: 'Icon', field: 'icon',render:(rowData)=> <Avatar src={`${ServerURL}/images/${rowData.icon}`}style={{width:40,height:40}} variant="rounded" />},
              

            ]}
            data={company}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Company',
                onClick: (event, rowData) =>handleSetDataForDialog(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add SubCompany',
                isFreeAction: true,
                onClick: (event) =>navigate('/dashboard/company')
              }
            ]}
          />
        )
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
              <div className={classes.mainContainer}>
          <div className={classes.box}>
          <Grid container spacing={2}>
              <Grid item xs={12} className={classes.headingStyle}>
               Company Interface   
              </Grid>
      
              <Grid item xs={4}>
              <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                label="Category"
                onChange={handleChange}
              >
              {fillCategoryDropDown()}
              </Select>
            </FormControl>
          
                </Grid>

                <Grid item xs={4}>
         <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select SubCategory
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subcategoryId}
                label="SubCategory"
                onChange={handleSubCategoryChange}
              >
              {fillSubCategoryDropDown()}
              </Select>
            </FormControl>
                    </Grid>
                <Grid item xs={4}>
                <TextField value={companyName} onChange={(event)=>setCompanyName(event.target.value)}   label="Company Name" fullWidth />
                </Grid>
             
             <Grid item xs={6}>
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
              <Button onClick={handleEditData} variant="contained" fullWidth>
                  Edit Data
               </Button>   
              
              
              </Grid>
      
                  <Grid item xs={6}>
                    
                      <Button onClick={handleDelete} variant="contained" fullWidth >
                          Delete
                      </Button>    
      
                    
                  </Grid>
              
      
          </Grid>
      </div> 
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
         {displayCompany()}
      </div>
      {showDialog()}
      </div>
      )
}
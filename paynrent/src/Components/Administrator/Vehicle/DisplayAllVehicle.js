import MaterialTable from "@material-table/core";
import {useState,useEffect} from "react";
import { Avatar,Button,TextField,Grid} from "@mui/material";
import {getData,ServerURL,postData} from "../../Services/FetchNodeServices";
import { useStyles } from "./DisplayAllVehicleCss";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { style } from "@mui/system";
import { upload } from "@testing-library/user-event/dist/upload";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { FaceRetouchingOffRounded } from "@mui/icons-material";
export default function DisplayAllVehicle(props){
     var classes=useStyles()
     var navigate=useNavigate()
    const [vehicle,setVehicle]=useState([])
    var  [icon,setIcon]=useState({filename:'/assets/defaultcar.png',bytes:''})
    var [prevIcon,setPrevIcon]=useState('')
    var [modelId,setModelId]=useState('')
    var [oldIcon,setOldIcon]=useState('')
    var [vehicleId,setVehicleId]=useState('')
    var [categoryId,setCategoryId]=useState('')
    var [subcategoryId,setSubCategoryId]=useState('')
    var [companyId,setCompanyId]=useState('')
    var [vendorId,setVendorId]=useState('')
    var  [registrationNo,setRegistrationNo]=useState('')
     var  [color,setColor]=useState('')
     var  [fueltype,setFuelType]=useState('')
     var  [ratings,setRatings]=useState('')
     var  [average,setAverage]=useState('')
     var  [transmission,setTransmission]=useState('')
     var  [capacity,setCapacity]=useState('')
     var  [status,setStatus]=useState('')
     var  [feature,setFeature]=useState('')
     var [categoryList,setCategoryList]=useState([])
     var [subCategoryList,setSubCategoryList]=useState([])
     var [companyList,setCompanyList]=useState([])
     var [modelList,setModelList]=useState([])

     
    var [buttonStatus,setButtonStatus]=useState({upload:true})
    const[open,setOpen]=useState(false)
    const fetchAllVehicle=async()=>{
     var result=await getData('vehicle/display_all_vehicle')
     setVehicle(result.data)
    }
    const fetchAllModel=async()=>{
     var result=await getData('model/display_all_model')
     setModelList(result.data)
    }
    const fetchAllCompany=async()=>{
     var result=await getData('company/display_all_company')
     setCompanyList(result.data)
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
     fetchAllVehicle()
    },[])

    const fillCategoryDropDown=()=>{
     return categoryList.map((item)=>{
   
        return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
   
        )
   
     })
   
   }
   const fetchAllSubcategoryByCategory=async(category_id)=>{
     var body={categoryid:category_id}
     var response=await postData('subcategory/fetch_all_subcategory_by_category',body)
     setSubCategoryList(response.result)
  }
  
  const fillSubCategoryDropDown=()=>{
    return subCategoryList.map((item)=>{
  
      return(
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      )
    })
  }
  const fetchAllCompanyBySubCategory=async(subcategory_id)=>{
     var body={subcategoryid:subcategory_id}
     var response=await postData('company/fetch_all_company_by_subcategory',body)
     setCompanyList(response.result)
   }
   
   const fillCompanyDropDown=()=>{
    return companyList.map((item)=>{
   
      return(
        <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
      )
    })
   }
   const fetchAllModelByCompany=async(company_id)=>{
     var body={companyid:company_id}
     var response=await postData('model/fetch_all_model_by_company',body)
     setModelList(response.result)
   }
   
   const fillModelDropDown=()=>{
    return modelList.map((item)=>{
   
      return(
        <MenuItem value={item.modelid}>{item.modelname}</MenuItem>
      )
    })
   }
  
  const handleChange=(event)=>{
     setCategoryId(event.target.value)
     fetchAllSubcategoryByCategory(event.target.value)
    
     }
     const handleSubChange=(event)=>{
         setSubCategoryId(event.target.value)
         fetchAllCompanyBySubCategory(event.target.value)
        
         }
         const handleComChange=(event)=>{
           setCompanyId(event.target.value)
           fetchAllModelByCompany(event.target.value)
        
           }
           const handleModChange=(event)=>{
             setModelId(event.target.value)
          
             }
             const handleFuel=(event)=>{
                 setFuelType(event.target.value)
              
                 }
                 const handleRatings=(event)=>{
                     setRatings(event.target.value)
                     }
                     
                     const handlestatusChange=(event)=>{
                         setStatus(event.target.value)
                         }
                         

    const handleSetDataForDialog=(rowData)=>{
      fetchAllCategory()
      fetchAllCompany()
      fetchAllModel()
      fetchAllSubCategory()
      fetchAllVehicle()
     setSubCategoryId(rowData.subcategoryid)
     setCategoryId(rowData.categoryid)
     setCompanyId(rowData.companyid)
     setVehicleId(rowData.vehicleid)
     setModelId(rowData.modelid)
     setVendorId(rowData.vendorid)
     setRegistrationNo(rowData.registrationno)
     setColor(rowData.color)
     setFuelType(rowData.fueltype)
     setRatings(rowData.ratings)
     setAverage(rowData.average)
     setTransmission(rowData.transmission)
     setCapacity(rowData.capacity)
     setStatus(rowData.status)
     setFeature(rowData.feature)
     setOldIcon(rowData.icon)
     setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
     setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
     setOpen(true)
 
    }

    const handleSavePicture=async()=>{
     var formData=new FormData()
     formData.append('vehicleid',vehicleId)
     formData.append('oldicon',oldIcon)
     formData.append('icon',icon.bytes)
     var response=await postData('vehicle/edit_picture',formData)
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
     fetchAllModel()
  
     }
     const handleDiscard=()=>{
          setIcon({filename:prevIcon,bytes:''})
          setButtonStatus({upload:true})
      
         }
  

  const handlePicture=(event)=>{
      setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      setButtonStatus({upload:false})
    
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

 

 
 const handleEditData=async()=>{
  var body={vehicleid:vehicleId,categoryid:categoryId,subcategoryid:subcategoryId,companyid:companyId,modelid:modelId,vendorid:vendorId,registrationno:registrationNo,color:color,fueltype:fueltype,ratings:ratings,average:average,transmission:transmission,capacity:capacity,status:status,feature:feature}
var response=await postData('vehicle/edit_data',body)

  if(response.status)
  {Swal.fire({
   
    icon: 'success',
    title: 'Done...',
    text: 'Data submitted sucessfully!',
   
  })

  }
  else
  { Swal.fire({
    
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
  
  })
}

setOpen(false)
fetchAllVehicle()

}
const handleDelete=async()=>{
      var body={vehicleid:vehicleId,oldicon:oldIcon}
      var response=await postData('vehicle/delete_data',body)
      if(response.status)
      {
       Swal.fire({
         icon: 'success',
         title: 'Done',
         text: 'Vehicle Deleted Successfully'
         
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
      fetchAllModel()
  

  }


    
    function displayVehicle() {
     return (
       <MaterialTable
         title="List of vehicles"
         columns={[
          { title:'Vehicle', field: 'vehicleid',render:(rowData)=><div>{rowData.vehicleid}/{rowData.vendorid}<br/>{rowData.status}</div> },
            
           { title:'Company', render:(rowData)=><div>{rowData.companyname}<br/>{rowData.modelname}/{rowData.capacity}</div> },
           { title: 'Category', field: 'categoryid',render:(rowData)=><div>{rowData.categoryname}<br/>{rowData.subcategoryname}<br/></div> },
           { title: 'Registration', field: 'registrationno',render:(rowData)=><div>{rowData.registrationno}/{rowData.color}<br/>{rowData.fueltype}/{rowData.average}</div> },
           { title: 'Ratings', field: 'ratings' },
           { title: 'Transmission', field: 'transmission' },
           
           { title: 'Feature', field: 'feature' },
           { title: 'Icon', field: 'icon',render:(rowData)=> <Avatar src={`${ServerURL}/images/${rowData.icon}`}style={{width:40,height:40}} variant="rounded" />},
           

         ]}
         data={vehicle}        
         actions={[
           {
             icon: 'edit',
             tooltip: 'Edit Vehicle',
             onClick: (event, rowData) =>handleSetDataForDialog(rowData)},
           
           {
               icon: 'add',
               tooltip: 'Add Vehicle',
               isFreeAction: true,
               onClick: (event) =>navigate('/dashboard/vehicle')
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
            Vehicle Interface   
           </Grid>
           <Grid item xs={3}>
                <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                label="Select Category"
                onChange={handleChange}
              >
             {fillCategoryDropDown()}
              </Select>
            </FormControl>
           </Grid>

        <Grid item xs={3}>
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select SubCategory
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subcategoryId}
                label="Select SubCategory"
               onChange={handleSubChange}
              >
               {fillSubCategoryDropDown()}            
              </Select>
            </FormControl>

        </Grid>
       
        <Grid item xs={3}>
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Company
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={companyId}
                label="Select Company"
               onChange={handleComChange}
              >
              {fillCompanyDropDown()}
              </Select>
            </FormControl>
        </Grid>

        <Grid item xs={3}>
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Model
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={modelId}
                label="Select Model"
               onChange={handleModChange}
              >
            {fillModelDropDown()}
              </Select>
            </FormControl>
        </Grid>
                <Grid item xs={3}>
                    <TextField value={vendorId} onChange={(event)=>setVendorId(event.target.value)} label="Vendor Id" fullWidth />
        
                </Grid>
                <Grid item xs={3}>
                    <TextField value={registrationNo} onChange={(event)=>setRegistrationNo(event.target.value)} label="Registration No" fullWidth />
                </Grid>
                <Grid item xs={3}>
                    <TextField value={color} onChange={(event)=>setColor(event.target.value)} label="Color" fullWidth />
                </Grid>
                <Grid item xs={3}>
                <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Fueltype
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fueltype}
                label="Select Fueltype"
               onChange={handleFuel}
              >
            <MenuItem value={1}>Petrol</MenuItem>
            <MenuItem value={2}>Diesel</MenuItem>
            <MenuItem value={3}>CNG</MenuItem>
            <MenuItem value={4}>Electric</MenuItem>
              </Select>
            </FormControl>
</Grid>
                <Grid item xs={3}>
                <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Ratings
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ratings}
                label="Select Ratings"
               onChange={handleRatings}
              >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <TextField value={average} onChange={(event)=>setAverage(event.target.value)} label="Average" fullWidth />
                </Grid>
                <Grid item xs={3}>
                    <TextField value={transmission} onChange={(event)=>setTransmission(event.target.value)} label="Transmission" fullWidth />
                </Grid>
                <Grid item xs={3}>
                    <TextField value={capacity} onChange={(event)=>setCapacity(event.target.value)} label="Capacity" fullWidth />
                </Grid>
                <Grid item xs={6}>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">Status</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={status}
                   onChange={handlestatusChange}
                   >
                  <FormControlLabel value="Continue" control={<Radio />} label="Continue" />
                  <FormControlLabel value="Discontinue" control={<Radio />} label="Discontinue" />
                  </RadioGroup>
                  </FormControl>
                </Grid>
                      <Grid item xs={6}>
                    <TextField value={feature} onChange={(event)=>setFeature(event.target.value)} label="Feature" fullWidth />
                </Grid>
                
        
                <Grid item xs={6}>
              {showHidePictureButtons()}
             </Grid>
              <Grid item xs={6} className={classes.center}>
              <Avatar
              alt="Vehicle Icon"
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
           {displayVehicle()}
        </div>
        {showDialog()}
        </div>
        )
  }
         
        
        

     
    
   
  


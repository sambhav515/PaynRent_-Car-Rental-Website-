import {useEffect,useState} from "react";
import {Grid,TextField,Button,Avatar}  from "@mui/material";
import { useStyles } from "./VehicleCss";
import {getData,ServerURL,postData} from "../../Services/FetchNodeServices";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Swal from "sweetalert2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { useNavigate } from "react-router-dom";

export default function Vehicle(props){
    const classes=useStyles();
    const navigate= useNavigate();
    var  [icon,setIcon]=useState({filename:'/assets/defaultcar.png',bytes:''})
    var  [vehicleId,setVehicleId]=useState('')
     var  [companyId,setCompanyId]=useState('')
     var  [modelId,setModelId]=useState('')
     var  [categoryId,setCategoryId]=useState('')
     var  [subcategoryId,setSubCategoryId]=useState('')
     var  [vendorId,setVendorId]=useState('')
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

     const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        setCategoryList(result.data)
       }
       useEffect(function(){
        fetchAllCategory()
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
     const handlePicture=(event)=>{
        setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]}) 
       
       
        }
        const handleSubmit=async()=>{
            var formData=new FormData()
            formData.append('vehicleid',vehicleId)
            formData.append('categoryid',categoryId)
            formData.append('subcategoryid',subcategoryId)
            formData.append('companyid',companyId)
            formData.append('modelid',modelId)
            formData.append('vendorid',vendorId)
            formData.append('registrationno',registrationNo)
            formData.append('color',color)
            formData.append('fueltype',fueltype)
            formData.append('ratings',ratings)
            formData.append('average',average)
            formData.append('transmission',transmission)
            formData.append('capacity',capacity)
            formData.append('status',status)
            formData.append('feature',feature)
            formData.append('icon',icon.bytes)
            var response=await postData('vehicle/submitvehicle',formData)
            if(response.status)
            {
             Swal.fire({
               icon: 'success',
               title: 'Done',
               text: 'vehicle Submitted Successfully'
               
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
          const handleShowVehicleList = () => {
            navigate("/dashboard/displayallvehicle");
          };
          return(<div className={classes.mainContainer}>
            <div className={classes.box}>
            <Grid container spacing={2}>
                <Grid item xs={12} className={classes.headingStyle}>
                <div className={classes.center}>
                <ListAltIcon style={{cursor:'pointer'}} onClick={handleShowVehicleList} />
                      <div style={{ marginLeft: 5 }}>Vehicle Interface</div>
                    </div>
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
                    <TextField onChange={(event)=>setVendorId(event.target.value)} label="Vendor Id" fullWidth />
        
                </Grid>
                <Grid item xs={3}>
                    <TextField onChange={(event)=>setRegistrationNo(event.target.value)} label="Registration No" fullWidth />
                </Grid>
                <Grid item xs={3}>
                    <TextField onChange={(event)=>setColor(event.target.value)} label="Color" fullWidth />
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
                    <TextField onChange={(event)=>setAverage(event.target.value)} label="Average" fullWidth />
                </Grid>
                <Grid item xs={3}>
                    <TextField onChange={(event)=>setTransmission(event.target.value)} label="Transmission" fullWidth />
                </Grid>
                <Grid item xs={3}>
                    <TextField onChange={(event)=>setCapacity(event.target.value)} label="Capacity" fullWidth />
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
                    <TextField onChange={(event)=>setFeature(event.target.value)} label="Feature" fullWidth />
                </Grid>
                <Grid item xs={6} >
                <Button fullWidth variant="contained" component="label">
                Upload
                <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
                </Button>
                </Grid>
        
                <Grid item xs={6} className={classes.center}>
                <Avatar
                alt="Vehicle Icon"
                src={icon.filename}
                variant="rounded"
                sx={{ width: 250, height: 90 }}
              />
                </Grid>
                <Grid item xs={6}>
                <Button onClick={handleSubmit} variant="contained" fullWidth>
                    Submit
                 </Button>   
                
                
                </Grid>
        
                    <Grid item xs={6}>
                      
                        <Button variant="contained" fullWidth >
                            Reset
                        </Button>    
        
                      
                    </Grid>
                
        
            </Grid>
        </div> 
         </div>)
        
        }

     
    
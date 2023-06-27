import {useEffect,useState} from "react";
import {Grid,TextField,Button,Avatar}  from "@mui/material";
import { useStyles } from "./CompanyCss";
import { getData,postData, ServerURL } from "../../Services/FetchNodeServices";
import ListAltIcon from "@mui/icons-material/ListAlt";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function Company(props){
 const classes=useStyles();
const navigate= useNavigate();
 var  [icon,setIcon]=useState({filename:'/assets/defaultcar.png',bytes:''})
 var  [companyId,setCompanyId]=useState('')
 var  [categoryId,setCategoryId]=useState('')
 var  [subcategoryId,setSubCategoryId]=useState('')
 var  [companyName,setCompanyName]=useState('')
 var [categoryList,setCategoryList]=useState([])
 var [subCategoryList,setSubCategoryList]=useState([])
 const fetchAllCategory=async()=>{
  var result=await getData('category/display_all_category')
  setCategoryList(result.data)
 }
 useEffect(function(){
  fetchAllCategory()
 },[])

 const fillCompanyDropDown=()=>{
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

 const handlePicture=(event)=>{
 setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]}) 


 }
 const handleSubmit=async()=>{
    var formData=new FormData()
    formData.append('companyid',companyId)
    formData.append('categoryid',categoryId)
    formData.append('subcategoryid',subcategoryId)
    formData.append('companyname',companyName)
    formData.append('icon',icon.bytes)
    var response=await postData('company/submitcompany',formData)
    if(response.status)
    {
     Swal.fire({
       icon: 'success',
       title: 'Done',
       text: 'Company Submitted Successfully'
       
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

  const handleChange=(event)=>{
    setCategoryId(event.target.value)
    fetchAllSubcategoryByCategory(event.target.value)
    }

    const handleSubCategoryChange=(event)=>{
      setSubCategoryId(event.target.value)
      }
 
 const clearValues=()=>{
    setCategoryId('')  
    setSubCategoryId('')
   setCompanyName('')
   setIcon({filename:'/assets/defaultcar.png',bytes:''})
   
 
 }
 const handleShowCompanyList = () => {
  navigate("/displayallcompany");
};
 
  return(<div className={classes.mainContainer}>
     <div className={classes.box}>
     <Grid container spacing={2}>
         <Grid item xs={12} className={classes.headingStyle}>
         <div className={classes.center}>
              <ListAltIcon onClick={handleShowCompanyList} />

              <div style={{ marginLeft: 5 }}>Company Interface</div>
            </div>
 
         </Grid>
         <Grid item xs={6}>
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
              {fillCompanyDropDown()}
              </Select>
            </FormControl>
          
 
         </Grid>
         <Grid item xs={6}>
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
        
         <Grid item xs={12}>
            <TextField onChange={(event)=>setCompanyName(event.target.value)} label="Company Name" fullWidth />
 
         </Grid>
         <Grid item xs={6} >
         <Button fullWidth variant="contained" component="label">
         Upload
         <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
       </Button>
         </Grid>
 
         <Grid item xs={6} className={classes.center}>
         <Avatar
         alt="Company Icon"
         src={icon.filename}
         variant="rounded"
         sx={{ width: 120, height: 56 }}
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

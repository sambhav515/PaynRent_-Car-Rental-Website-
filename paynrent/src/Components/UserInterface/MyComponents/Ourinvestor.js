import React from 'react'
import { Box,Stack } from '@mui/system'

export default function Ourinvestor() {
  return (
    <div>
        <div style={{textAlign:"center"}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:"30px",paddingBottom:"10px"}}>
        <div style={{fontSize:25,fontWight:200,fontFamily:"Arial Black",color:"#FFF"}}>Our investors</div>
    </div>
    <div style={{height:"auto",width:"96%",backgroundColor:"white",borderRadius:"10px",padding:"20px",boxShadow:"0px 0px 10px -5px black"}}>
        <Stack sx={{display:"flex",justifyContent:"space-between"}} direction={{xs:"column",sm:"column",md:"row"}}>
            <Box xs={3} sx={{display:"flex",justifyContent:"center",padding:"0px 10px"}}>
               <Box sx={{padding:"10px 0px",textAlign:"center"}}>
                  <div><img src="https://www.revv.co.in/assets/RentalImages/HomeScreen/rental2021/investors/hyundai.webp" width="150px"/></div>
                  
                  <p>Hyundai Motor Company</p>
               </Box>
            </Box>
            <Box xs={3} sx={{display:"flex",justifyContent:"center",padding:"0px 10px"}}>
               <Box sx={{padding:"10px 0px",textAlign:"center"}}>
                  <div><img src="https://www.revv.co.in/assets/RentalImages/HomeScreen/rental2021/investors/edelweissFinancialServices.webp" width="150px"/></div>
                  
                  <p>Edelweiss Financial Services</p>
               </Box>
            </Box>
            <Box xs={3} sx={{display:"flex",justifyContent:"center",padding:"0px 10px"}}>
               <Box sx={{padding:"10px 0px",textAlign:"center"}}>
                  <div><img src="https://www.revv.co.in/assets/RentalImages/HomeScreen/rental2021/investors/dreamIncubator.webp" width="150px"/></div>
                  
                  <p>Dream Incubator</p>
               </Box>
            </Box>
            <Box xs={3} sx={{display:"flex",justifyContent:"center",padding:"0px 10px"}}>
               <Box sx={{padding:"10px 0px",textAlign:"center"}}>
                  <div><img src="https://www.revv.co.in/assets/RentalImages/HomeScreen/rental2021/investors/beenext.webp" width="150px"/></div>
                  
                  <p>Beenext</p>
               </Box>
            </Box>
            
            
            
           
        </Stack>
    </div>
    </div>
    </div>
  )
}

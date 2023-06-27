import { Stack } from '@mui/system'
import { Box } from '@mui/system'
import React from 'react'

export const  Ourjourney= () => {
  return (
    <>
    <div style={{textAlign:"center"}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:"30px",paddingBottom:"10px"}}>
        <div style={{fontSize:25,fontWight:200,fontFamily:"Arial Black",color:"#A8B5C0"}}>Our journey so far</div>
    </div>
    <div style={{height:"auto",width:"96%",backgroundColor:"white",borderRadius:"10px",padding:"20px",boxShadow:"0px 0px 10px -5px black"}}>
        <Stack sx={{display:"flex",justifyContent:"space-between"}} direction={{xs:"column",sm:"column",md:"row"}}>
            <Box xs={3} sx={{display:"flex",justifyContent:"center",padding:"0px 60px"}}>
               <Box sx={{padding:"10px 0px",textAlign:"left"}}>
                  <div><img src='assets/OJ_icon1.png' width="70px"/></div>
                  <h2 style={{lineHeight:0.2}}>1 Mn +</h2>
                  <p>Happy Customer</p>
               </Box>
            </Box>
            <Box xs={3} sx={{display:"flex",justifyContent:"center",padding:"0px 60px"}}>
               <Box sx={{padding:"10px 0px",textAlign:"left"}}>
                  <div><img src='assets/OJ_icon2.png' width="70px"/></div>
                  <h2 style={{lineHeight:0.2}}>22+ cities</h2>
                  <p>Across India</p>
               </Box>
            </Box>
            <Box xs={3} sx={{display:"flex",justifyContent:"center",padding:"0px 60px"}}>
               <Box sx={{padding:"10px 0px",textAlign:"left"}}>
                  <div><img src='assets/OJ_icon3.png' width="70px"/></div>
                  <h2 style={{lineHeight:0.2}}>50 Mn +</h2>
                  <p>Kms travelled</p>
               </Box>
            </Box>
            <Box xs={3} sx={{display:"flex",justifyContent:"center",padding:"0px 60px"}}>
               <Box sx={{padding:"10px 0px",textAlign:"left"}}>
                  <div><img src='assets/OJ_icon4.png' width="70px"/></div>
                  <h2 style={{lineHeight:0.2}}>4.8 / 5</h2>
                  <p>20K+ reviewers</p>
               </Box>
            </Box>
           
        </Stack>
    </div>
    </div>
    </>
  )
}

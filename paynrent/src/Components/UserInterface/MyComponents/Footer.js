import React from 'react';
import { SocialProvider, SocialLink } from '@mui-treasury/components/socialLink'
import { usePoofSocialLinkStyles } from '@mui-treasury/styles/socialLink/poof';
import { Box, Stack } from "@mui/system";

export default function Footer() {
  return (
    <>
      <div>
        <div
          style={{
            textAlign: "center",
           
            marginTop: "3%",
          }}
        >
          <div
            style={{
              height: "auto",
              width: "96%",
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0px 0px 10px -5px black",
            }}
          >
            <Stack
              sx={{ display: "flex", justifyContent: "space-around" }}
              direction={{ xs: "column", sm: "column", md: "row" }}
            >
              <Box
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "0px 10px",
                }}
              >
                <Box sx={{ padding: "10px 0px", textAlign: "center" }}>
                  <div>
                    <img
                      src="assets/logo4.png"
                      width="200px"
                    />
                  </div>

                  
                </Box>
              </Box>
              <Box
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "0px 10px",
                }}
              >
                <Box sx={{ padding: "10px 0px", textAlign: "center",color:"#4D4D4D",fontSize:"16px",fontWeight:"bold" }} >
                    <Stack spacing={2} direction={{md:"column",sm:"row",xs:"row"}}>
                  <box style={{cursor:"pointer"}}><a>Home</a></box>
                  <box style={{cursor:"pointer"}}><a>FAQs</a></box>
                  <box style={{cursor:"pointer"}}><a>Policy</a></box>
                  <box style={{cursor:"pointer"}}><a>Blog</a></box>
                  </Stack>
                </Box>
              </Box>
              <Box
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "0px 10px",
                }}
              >
                <Box sx={{ padding: "10px 0px", display:"flex",flexDirection:"column",alignItems:"flex-start" }}>
                  <Box ><h3 style={{lineHeight:0.1}}>Social</h3></Box>
                  <Box>
                    <SocialProvider useStyles={usePoofSocialLinkStyles}>
                       <SocialLink brand={'Twitter'} />
                       <SocialLink brand={'Instagram'} />
                       <SocialLink brand={'Facebook'}  />
                       <SocialLink brand={'Twitter'} />
                        
                    </SocialProvider>
                   </Box>
                   <h3 style={{color:'#4D4D4D',lineHeight:0.2}}>Download the Revv App!</h3>

                    <Stack spacing={1} direction={{xs:"column"}}>
                   <Box sx={{height:"40px",width:"230px",border:"1px solid #4D4D4D",borderRadius:"5px",display:"flex" }}><a><img src='https://www.revv.co.in/assets/RentalImages/HomeScreen/rental2021/logo/appstore_apple.webp' width="25px" />Download <b>App Store</b></a></Box>

                   <Box sx={{height:"40px",width:"230px",border:"1px solid #4D4D4D",borderRadius:"5px",display:"flex",alignContent:"center" }}><a><img src='https://www.revv.co.in/assets/RentalImages/HomeScreen/rental2021/logo/playstore_google.webp' width="25px" />Download <b>Apple Store</b></a></Box>
                   </Stack>
                </Box>
                
              </Box>
              
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
}

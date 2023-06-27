import React from "react";
import { Stack } from "@mui/system";
import { Box } from "@mui/system";

export default function PlayStore() {
  return (
    <div>
      <div
        style={{ textAlign: "center"}}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "30px",
            paddingBottom: "10px",
          }}
        >
          <div
            style={{
              height: "auto",
              width: "96%",
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "20px 20px 0px 20px",
              boxShadow: "0px 0px 10px -5px black",
            }}
          >
            <Stack
              sx={{ display: "flex",justifyContent:"space-around" }}
              direction={{ xs: "column", sm: "column", md: "row" }}
            >
              <Box
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "0px 0px",
                }}
              >
                <Box sx={{ paddingTop: "100px", textAlign: "center" }}>
                   <h2 style={{ lineHeight: 0.5,color:"#abb7c1" }}>Download the Revv app</h2>
                   <br/>
                   <div style={{display:"flex",justifyContent:"space-around"}}> 
                  <div>
                    <img src="assets/apple_stote.png" width="150px" />
                  </div>
                  <div>
                    <img src="assets/google_store.png" width="150px" />
                  </div>
                  </div>
                </Box>
              </Box>
              <Box
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems:"center",
                  padding: "0px 0px",
                }}
              >
                <Box sx={{ padding: "1px 0px", textAlign: "left" }}>
                  <div>
                    <img src="assets/mobile.png" width="100%" />
                  </div>
                </Box>
              </Box>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}

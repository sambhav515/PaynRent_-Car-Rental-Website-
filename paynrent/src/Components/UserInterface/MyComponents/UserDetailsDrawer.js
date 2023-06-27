import * as React from "react";

import Drawer from "@mui/material/Drawer";
import { Button, TextField, Grid } from "@mui/material";
import {postData} from "../../Services/FetchNodeServices"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function UserSignUpDrawer(props) {
  var dispatch=useDispatch()
  var navigate=useNavigate()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [mobile, setMobile] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [aadhar, setAadhar] = React.useState("");
  const [license, setLicense] = React.useState("");
  const [dob, setDob] = React.useState("");


  React.useEffect(
    function () {
      console.log("Props:", props.status);
      setState({ ...state, ["right"]: props.status });
    },
    [props]
  );
  const fetchUserDetails=async()=>{
    var result=await postData('user/check_user_mobileno',{mobileno:props.mobile})
    dispatch({type:'ADD_USER',payload:[props.mobile,result.data]}) 
    

  }
  const handleSubmit=async()=>{
    var body={mobileno:props.mobile,emailid:emailAddress,fullname:fullName,birthdate:dob,aadharno:aadhar,licenseno:license}
    var result=await postData('user/submituserdetails',body)
   if(result.status) 
   {
    alert('Successfully Registered...')
    setState({ ...state, ["right"]: false });
    fetchUserDetails()
    navigate("/vehicledetailcomponent")
   }
   else
   {
    alert('Registration Failed...')

   }
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    props.handleStatus(open);
    setState({ ...state, ["right"]: open });
  };
  const list = (anchor) => (
    <Grid container spacing={3} style={{ width: 400, padding: 30 }}>
      <Grid item xs={12}>
        <img src="/assets/logo1.png" style={{ width: 70, padding: 3 }} />
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          textAlign: "center",
          width: 24,
          fontFamily: "Poppins",
          fontWeight: 700,
        }}
      >
        Sign Up
      </Grid>

      <Grid item xs={12}>
        <TextField
          onChange={(event) => setMobile(event.target.value)}
          //value={mobile}
          variant="outlined"
          fullWidth
          value={props.mobile}
          label={
            <span style={{ width: 24, fontFamily: "Poppins", fontWeight: 700 }}>
              Mobile Number
            </span>
          }
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          onChange={(event) => setEmailAddress(event.target.value)}
          variant="outlined"
          fullWidth
          label={
            <span style={{ width: 24, fontFamily: "Poppins", fontWeight: 700 }}>
              Email Address
            </span>
          }
        ></TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          onChange={(event) => setFullName(event.target.value)}
          variant="outlined"
          fullWidth
          label={
            <span style={{ width: 24, fontFamily: "Poppins", fontWeight: 700 }}>
              FullName
            </span>
          }
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
         
          onChange={(event) => setDob(event.target.value)}
          variant="outlined"
          fullWidth
          label={
            <span style={{ width: 24, fontFamily: "Poppins", fontWeight: 700 }}>
              Birth Date
            </span>
          }
        ></TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          onChange={(event) => setAadhar(event.target.value)}
          variant="outlined"
          fullWidth
          label={
            <span style={{ width: 24, fontFamily: "Poppins", fontWeight: 700 }}>
              Aadhar Number
            </span>
          }
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          onChange={(event) => setLicense(event.target.value)}
          variant="outlined"
          fullWidth
          label={
            <span style={{ width: 24, fontFamily: "Poppins", fontWeight: 700 }}>
              Driving License
            </span>
          }
        ></TextField>
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{
            background: "linear-gradient(270deg,#1caba2,20%,#1c7fab)",
          }}
          fullWidth
        >
          Proceed
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <Drawer
          anchor={"right"}
          open={state.right}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

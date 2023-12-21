import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ServerURL } from "../../Services/FetchNodeServices";
import UserSignUpDrawer from "./UserSignUpDrawer";
import { useDispatch,useSelector } from "react-redux";
export default function VehicleComponent(props) {
  var item = props.item;
  var bookingDetails=useSelector((state)=>state.booking)
  var dispatch=useDispatch()
  var [status,setStatus]=useState(false)
  const handleClick=(item)=>{
   var rent=(item.rentperhour*(bookingDetails.days*24))+(item.rentperhour*bookingDetails.hrs)
   item['rent']=rent //to add new key value
   dispatch({type:"ADD_VEHICLE",payload:[item.vehicleid,item]}) 
  setStatus(true)
  }
  const handleStatus=()=>{
    
    setStatus(false)
    }
  return (
    <div
      style={{
        width: 250,
        display: "flex",
        background: "#fff",
        padding: 10,
        borderRadius: 20,
        flexDirection: "column",
      }}
    >
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <img src={`${ServerURL}/images/${item.icon}`} width="60%" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", padding: 10 }}>
        <div style={{ color: "#59646f", fontSize: 11, fontWeight: 600 }}>
          {item.companyname}
        </div>

        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#122232",
            marginTop: 8,
          }}
        >
          {item.modelname}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
            fontFamily: "Poppins",
            fontSize: 12,
            fontWeight: 400,
            color: "#59646f",
          }}
        >
          <div>
            <span style={{ marginRight: 3 }}>
              <img src="/assets/icondiesel.svg" />
            </span>
            {item.fueltype}
          </div>
          <div style={{ marginLeft: 7 }}>
            <span style={{ marginRight: 3 }}>
              <img src="/assets/icontransmission.svg" />
            </span>
            {item.transmission}
          </div>
          <div style={{ marginLeft: 7 }}>
            <span style={{ marginRight: 3 }}>
              <img src="/assets/iconseat.svg" />
            </span>
            {item.capacity} Seats
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 8,
            height: 30,
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span
              style={{
                fontSize: 24,
                fontWeight: "bolder",
                marginRight: 5,
              }}
            >
              &#8377;
            </span>

            <span
              style={{
                fontSize: 28,
                fontWeight: "bolder",
              }}
            >
              {(item.rentperhour*(bookingDetails.days*24))+(item.rentperhour*bookingDetails.hrs)}
            </span>
          </div>
          <span>
            <Button
             onClick={()=>handleClick(item)} 
              variant="contained"
              style={{
                background: "linear-gradient(270deg,#1caba2,20%,#1c7fab)",
              }}
            >
              Book
            </Button>
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 15 }}>
          <span
            style={{
              fontSize: 12,
              color: "#59646f",
            }}
          >
            Prices <span style={{ fontWeight: "bolder" }}>exclude</span> fuel
            cost
          </span>
        </div>
      </div>
      <UserSignUpDrawer status={status}  handleStatus={handleStatus}/>
    </div>
  );
}

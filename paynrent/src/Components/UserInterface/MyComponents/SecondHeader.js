import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Divider, TextField } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import { getData } from "../../Services/FetchNodeServices";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import DateDiff from "date-diff";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
export default function SecondHeader() {
  var bookingDetails=useSelector(state=>state.booking)
  const [selectedCity, setSelectedCity] = useState(bookingDetails.city);
  const [cities, setCities] = useState([]);
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState(bookingDetails.starttime);
  const [endTime, setEndTime] = useState(bookingDetails.endtime);
  const [daysTime, setDaysTime] = useState("");
  
 
  
  const handleSetStartTimeValue = (newValue) => {
    //  setStartTime(newValue)
    //setStOpen(false)
    setStartTime(newValue);
  };
  const handleSetEndTimeValue = (newValue) => {
    setEndTime(newValue);
    dateDiff(newValue);
  };
  const dateDiff = (et) => {
    var startDay = new Date(startTime);
    var endDay = new Date(et);

    var diff = new DateDiff(endDay, startDay);
    setDaysTime(
      "Duration  " +
        parseInt(diff.days()) +
        " Days " +
        parseInt(diff.hours() % 24) +
        " Hrs " +
        parseInt(diff.minutes() % 60) +
        " Minutes "
    );
    /*  *****we can also use this ***
        var millisecondsPerDay = 1000 * 60 * 60 * 24;
    
        var millisBetween = endDay.getTime() - startDay.getTime();
        var days = millisBetween / millisecondsPerDay;
        setDaysTime(Math.round(days));*/
  };
  const handleCitySelect = (cityselected) => {
    setSelectedCity(cityselected);
    setOpen(false);
  };
  const fetchAllCities = async () => {
    var response = await getData("user/display_all_cities");
    setCities(response.data);
  };

  const showTopList = () => {
    return cities.map((item) => {
      return (
        <>
          {item.status == "Top City" ? (
            <ListItem button>
              <ListItemText
                primary={
                  <span style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item.cityname}
                  </span>
                }
                style={{ fontSize: 18 }}
                onClick={() => handleCitySelect(item.cityname)}
              />
            </ListItem>
          ) : (
            <></>
          )}
        </>
      );
    });
  };

  const showOtherList = () => {
    return cities.map((item) => {
      return (
        <>
          {item.status == "Other City" ? (
            <ListItem button>
              <ListItemText
                primary={item.cityname}
                style={{ fontSize: 18 }}
                onClick={() => handleCitySelect(item.cityname)}
              />
            </ListItem>
          ) : (
            <></>
          )}
        </>
      );
    });
  };

  useEffect(function () {
    fetchAllCities();
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCityDialog = () => {
    setOpen(true);
  };
  const cityDialog = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: { borderRadius: 20 },
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            {"Select Your city"}

            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent style={{ width: 350 }}>
            <List>
              <div>Top Cities</div>
              {showTopList()}
              <div>Other Cities</div>
              {showOtherList()}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <div>
      <AppBar position="static" color="inherit" style={{ padding: 10 }}>
        <Toolbar
          style={{
            background: "#fff",
            position: "relative",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              position: "absolute",
              left: "8%",
              top: "-5%",
              color: "#aaaaaa",
            }}
          >
            Modify Search
          </div>
          <div style={{ position: "absolute", left: "8%", top: "10%" }}>
            <div style={{}}>
              <div
                onClick={handleCityDialog}
                style={{
                  cursor: "pointer",
                  marginTop: "5%",
                  alignItems: "center",
                  padding: 10,
                  width: 200,
                  height: 20,
                  borderRadius: "5px 1px 1px 5px",
                  border: "1px solid #e5e7ea",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f1f4f8",
                }}
              >
                <LocationOn style={{ fontSize: 22, color: "#1c7fab" }} />
                <span
                  style={{
                    paddingLeft: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "rgb(18, 34, 50)",
                  }}
                >
                  {selectedCity}
                </span>
                <KeyboardArrowDownIcon
                  style={{
                    marginLeft: "auto",
                    color: "#1c7fab",
                    fontWeight: 400,
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: "22.7%",
              top: "27%",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                border: "1px solid #e5e7ea",
                width: 200,
                height: 40,
                borderRadius: 0,
                backgroundColor: "#f1f4f8",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                  label={
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#7f8c8d",
                        // paddingLeft: 20,
                      }}
                    >
                      Start Time
                    </span>
                  }
                  value={startTime}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  onChange={(newValue) => {
                    handleSetStartTimeValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="standard"
                      {...params}
                      style={{ marginLeft: 15, marginTop: 3 }}
                    />
                  )}
                />
              </LocalizationProvider>
              <KeyboardArrowDownIcon
                style={{ marginLeft: 15, color: "#1c7fab" }}
              />
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: "36%",
              top: "27%",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                border: "1px solid #e5e7ea",
                width: 200,
                height: 40,
                borderRadius: "0px 5px 5px 0px",
                backgroundColor: "#f1f4f8",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                  label={
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#7f8c8d",
                        // paddingLeft: 40,
                      }}
                    >
                      End Time
                    </span>
                  }
                  value={endTime}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  onChange={(newValue) => {
                    handleSetEndTimeValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="standard"
                      {...params}
                      style={{ marginLeft: 15, marginTop: 3 }}
                    />
                  )}
                />
              </LocalizationProvider>
              <KeyboardArrowDownIcon
                style={{ marginLeft: 15, color: "#1c7fab" }}
              />
            </div>
          </div>

          <div style={{ position: "absolute", left: "50%", top: "10%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
                marginTop: "7%",
                alignItems: "center",
                padding: 10,
                display: "flex",
                width: 140,
                height: 21,
                borderRadius: 5,
                background: "linear-gradient(270deg,#1caba2, 20%,#1c7fab)",
              }}
            >
              <span
                style={{ fontSize: 18, fontWeight: "bolder", color: "#fff" }}
              >
                Search
              </span>
            </div>
          </div>

          <div
            style={{
              padding: 8,
              width: 80,
              fontSize: 14,
              border: "1px solid #dddddd",
              borderRadius: 5,
              margin: "12px 5px 0px 5px",
            }}
          >
            Swift Dzire
          </div>
          <div
            style={{
              padding: 8,
              width: 80,
              fontSize: 14,
              border: "1px solid #dddddd",
              borderRadius: 5,
              margin: "12px 5px 0px 5px",
            }}
          >
            Scorpio
          </div>
          <div
            style={{
              padding: 8,
              width: 80,
              fontSize: 14,
              border: "1px solid #dddddd",
              borderRadius: 5,
              margin: "12px 5px 0px 5px",
            }}
          >
            XUV
          </div>
          <div
            style={{
              padding: 8,
              width: 80,
              fontSize: 14,
              border: "1px solid #dddddd",
              borderRadius: 5,
              margin: "12px 5px 0px 5px",
            }}
          >
            Celerio
          </div>
          <div
            style={{
              padding: 8,
              width: 80,
              fontSize: 14,
              border: "1px solid #dddddd",
              borderRadius: 5,
              margin: "12px 5px 0px 5px",
            }}
          >
            Baleno
          </div>
        </Toolbar>
      </AppBar>
      {cityDialog()}
    </div>
  );
}

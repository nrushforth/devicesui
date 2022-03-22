import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Container } from "@mui/material";




//import { developers } from "./Store/Store";

const theme = createTheme();

const DeviceForm = (props) => {
  const [device, fetchDevice] = useState(null);

  const [deviceType, setDeviceType] = useState('');
  const [deviceDescription, setDeviceDescription] = useState('');
  const [deviceOwner, setDeviceOwner] = useState('');
  const [deviceSerialNumber, setDeviceSerialNumber] = useState('');
  const [deviceEnergyRating, setDeviceEnergyRating] = useState('');  
  const [deviceLocation, setDeviceLocation] = useState('');
  const [deviceInstalled, setDeviceInstalled] = useState('');
  const [deviceRemoved, setDeviceRemoved] = useState('');

  async function getData() {
    console.log('getting data');
    await fetch('http://localhost:3000/api/devices/' + props.id)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFields(res);
      });
  }

  

  useEffect(() => {
    if (props.mode === 'Update')
    {
    getData();
    }
    else
    {
      setFields({ "deviceType": "",
      "deviceDescription": "",
      "deviceOwner": "",
      "deviceSerialNumber": "",
      "deviceEnergyRating": "",
      "deviceInstalled": "",
      "deviceRemoved": "",
      "deviceLocation": ""});
    }
  }, [])

   

  const setFields = (device) =>
  {    
    fetchDevice(device);

    setDeviceDescription(device.deviceDescription);
    setDeviceType(device.deviceType);
    setDeviceOwner(device.deviceOwner);
    setDeviceSerialNumber(device.deviceSerialNumber);
    setDeviceEnergyRating(device.deviceEnergyRating);
    setDeviceLocation(device.deviceLocation);
    setDeviceInstalled(device.deviceInstalled);
    setDeviceRemoved(device.deviceRemoved);
    console.log('setting data');
    console.log(device.deviceLocation);
  }

  const handleTextFieldChange = (event) => {
    console.log(event.target.id);
    console.log(device);
    switch(event.target.id)
    {
      case "description":
        setDeviceDescription(event.target.value);
        break;
      case "owner":
        setDeviceOwner(event.target.value);
        break;
      case "serialNumber":
        setDeviceSerialNumber(event.target.value);
        break;
      case "energyRating":
          setDeviceEnergyRating(event.target.value);
          break;            
      case "location":
        setDeviceLocation(event.target.value);
        break;    
      case "installedDate":
        setDeviceInstalled(event.target.value);
        break;                               
      case "removedDate":
        setDeviceRemoved(event.target.value);
        break;                               
      default:
        break;
    };
  }

  const handleCancel = (event) => {
    props.setPage("MAIN_PAGE");
  }

  async function handleSubmit() {
    console.log('saving data');

    device.deviceLocation = deviceLocation;

    const newDevice = { "deviceType": deviceType,
    "deviceDescription": deviceDescription,
    "deviceOwner": deviceOwner,
    "deviceSerialNumber": deviceSerialNumber,
    "deviceEnergyRating": deviceEnergyRating,
    "deviceInstalled": deviceInstalled,
    "deviceRemoved": deviceRemoved,
    "deviceLocation": deviceLocation};

    const contentLength = JSON.stringify(newDevice).length;

    console.log(newDevice);
    console.log(contentLength);


    await fetch('http://localhost:3000/api/devices/' + (props.mode === 'Add' ? '' : props.id) ,
    { method: (props.mode === 'Add' ? 'POST' : 'PUT'), 
      
      credentials: 'same-origin',
      headers: {  'content-type': 'application/json', 
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',                  
                  'Content-Length' : contentLength.toString(),
      },
      body: JSON.stringify(newDevice),
  
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);        
      }).catch((error) => {console.log(error);});

      props.setPage("MAIN_PAGE");
  }

  const deviceTypeOptions = ["Laptop", "Monitor", "Printer", "Photocopier", "Other",""];
  const deviceEnergyRatings = ["A", "B", "C", "D", "E", "F", "G",""];

  const handleAutoCompleteChange = (event, value) => {
    console.log(value);
    if (value !== '')
      setDeviceType(value);    
  }

  const handleInputAutoCompleteChange = (event, value) => {
    console.log(value); 
    if (value !== '')
    {   
      device.deviceType = value;
      setDeviceType(device.deviceType);    
    }
  };

  const handleDeviceEnergyRatingAutoCompleteChange = (event, value) => {
    console.log('handleDeviceEnergyRatingAutoCompleteChange ' + value);
    console.log(device.deviceEnergyRating);   
    if (value !== '')
      setDeviceEnergyRating(value);    
  }

  const handleDeviceEnergyRatingInputAutoCompleteChange = (event, value) => {
    console.log('handleDeviceEnergyRatingInputAutoCompleteChange ' + value); 
    console.log(device.deviceEnergyRating);   
    if (value !== '')
    {
      device.deviceEnergyRating = value;
      setDeviceEnergyRating(device.deviceEnergyRating);    
    }
  };

  async function handleDelete() {
    if (window.confirm('Are you sure you want to delete the device?'))
    {
      console.log('deleteing data');
      
      await fetch('http://localhost:3000/api/devices/' + props.id,
      { method: 'DELETE', })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);        
      }).catch((error) => {console.log(error);});

      props.setPage("MAIN_PAGE");
    } 
  };
  // const handleButtonClick = useCallback(() => {
  //   developers.push({name: devName, tech: devTech, work: devWork});
  // }, [devName, devTech, devWork]);

  return ( 
    <ThemeProvider theme={theme}>
       { device && 
      <Container component="main" maxWidth="xs" >
        <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography component="h1" variant="h5">
           { props.mode } Device Information
        </Typography>
        <Typography component="h1" variant="h6">
           { props.id }
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} >

            <Autocomplete size="small" fullWidth
              options={deviceTypeOptions}
              getOptionLabel={(option) => option}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Device Type"
                  />
                );
              }}
              inputValue={device.deviceType}
              value={deviceType}
              onInputChange={handleInputAutoCompleteChange} 
              onChange={handleAutoCompleteChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField id="owner" value={deviceOwner} label="Device Owner" variant="outlined" size="small" fullWidth onChange={handleTextFieldChange} />
          </Grid>
          <Grid item xs={12}>      
            <TextField id="description" value={deviceDescription} label="Device Description" variant="outlined" size="small" fullWidth onChange={handleTextFieldChange} />        
          </Grid>

          <Grid item xs={12}>                    
            <TextField id="serialNumber" value={deviceSerialNumber} label="Device Serial Number" variant="outlined" size="small" fullWidth onChange={handleTextFieldChange} />
          </Grid>
          <Grid item xs={12} sm={6}>                    
            {/* <TextField id="energyRating" value={deviceEnergyRating} label="Device Energy Rating" variant="outlined" size="small" fullWidth onChange={handleTextFieldChange} /> */}
            <Autocomplete size="small" fullWidth
              options={deviceEnergyRatings}
              getOptionLabel={(option) => option}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Device Energy Rating"
                  />
                );
              }}
              inputValue={device.deviceEnergyRating}
              value={deviceEnergyRating}
              onInputChange={handleDeviceEnergyRatingInputAutoCompleteChange} 
              onChange={handleDeviceEnergyRatingAutoCompleteChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>                    
            <TextField id="location" value={deviceLocation} label="Device Location" variant="outlined" size="small" fullWidth onChange={handleTextFieldChange} />
          </Grid>
          <Grid item xs={12}>                    
            <TextField id="installedDate" value={deviceInstalled} label="Device Installed Date" variant="outlined" size="small" fullWidth onChange={handleTextFieldChange} />
          </Grid>
          <Grid item xs={12}>                    
            <TextField id="removedDate" value={deviceRemoved} label="Device Removed" variant="outlined" size="small" fullWidth onChange={handleTextFieldChange} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6} >
        <Button variant="contained" color="success"  sx={{ mt: 3, mb: 1 }} fullWidth onClick={handleCancel}>Cancel</Button>      
        </Grid>          
        <Grid item xs={12} sm={6} >          
        <Button variant="contained" color="success"  sx={{ mt: 3, mb: 1 }} fullWidth onClick={handleSubmit}>Save</Button>      
        </Grid>
        { props.mode === 'Update' &&
        <Grid item xs={12}>                    
            <Button variant="contained" color="error"  sx={{ mt: 0, mb: 0 }} fullWidth onClick={handleDelete}>Delete</Button>      
          </Grid> }
        </Grid>
      </Box>
      </Box>
      </Paper>
      </Container> }
    </ThemeProvider> 
  );
};

export default DeviceForm;
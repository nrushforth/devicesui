import React, { useCallback, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import { ThemeProvider } from "@mui/material/styles";
import { FormTheme } from "./FormTheme";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Paper } from "@mui/material";
import { SentimentSatisfiedAltSharp } from "@material-ui/icons";
//import { developers } from "./Store/Store";

const formStyle = {
  maxWidth: 500
}

const DeviceForm = (props) => {
  const [device, fetchDevice] = useState(null);

  const [deviceType, setDeviceType] = useState('');
  const [deviceDescription, setDeviceDescription] = useState('');
  const [deviceOwner, setDeviceOwner] = useState('');
  const [deviceSerialNumber, setDeviceSerialNumber] = useState('');
  const [deviceLocation, setDeviceLocation] = useState('');
  const [deviceInstalledDate, setDeviceInstalledDate] = useState('');
  const [deviceRemovedDate, setDeviceRemovedDate] = useState('');

  const getData = () => {
    console.log('getting data');
    fetch('http://localhost:3000/api/devices/62349d220aeb6f389a4a4b77')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFields(res);
      });
  }

  useEffect(() => {
    getData();
  }, [])

   

  const setFields = (device) =>
  {    
    fetchDevice(device);
    setDeviceDescription(device.deviceDescription);
    setDeviceType(device.deviceType);
    setDeviceOwner(device.deviceOwner);
    setDeviceSerialNumber(device.deviceSerialNumber);
  }

  const handleTextFieldChange = (event) => {
    console.log(event.target.id);
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
      case "location":
        setDeviceLocation(event.target.value);
        break;    
      case "installedDate":
        setDeviceInstalledDate(event.target.value);
        break;                               
      case "removedDate":
        setDeviceRemovedDate(event.target.value);
        break;                               
      default:
        break;
    };
  }

  const deviceTypeOptions = ["Laptop", "Monitor", "Printer", "Photocopier", "Other",""];

  const handleAutoCompleteChange = (event, value) => {
    console.log(value);
    setDeviceType(value);    
  }

  const handleInputAutoCompleteChange = (event, value) => {
    console.log(value);    
    device.deviceType = value;
    setDeviceType(deviceTypeOptions[0]);    
  }

  // const handleButtonClick = useCallback(() => {
  //   developers.push({name: devName, tech: devTech, work: devWork});
  // }, [devName, devTech, devWork]);

  return ( 
    <ThemeProvider theme={FormTheme}>
      { device &&
    <form style={formStyle}>
      <Paper elevation={3}>
      <Typography variant="h6">Device Information:</Typography>
      <Autocomplete size="small" sx={{width:300}}
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
      <Stack >
      <TextField id="description" value={deviceDescription} label="Device Description" variant="outlined" size="small" sx={{width:450}} onChange={handleTextFieldChange} />        
      <TextField id="owner" value={deviceOwner} label="Device Owner" variant="outlined" size="small" sx={{width:300}} onChange={handleTextFieldChange} />

      <TextField id="serialNumber" value={deviceSerialNumber} label="Device Serial Number" variant="outlined" size="small" sx={{width:300}} onChange={handleTextFieldChange} />
      <TextField id="location" value={deviceLocation} label="Device Location" variant="outlined" size="small" sx={{width:300}} onChange={handleTextFieldChange} />
      <TextField id="installedDate" value={deviceInstalledDate} label="Device Installed Date" variant="outlined" size="small" sx={{width:300}} onChange={handleTextFieldChange} />
      <TextField id="removedDate" value={deviceRemovedDate} label="Device Removed" variant="outlined" size="small" sx={{width:300}} onChange={handleTextFieldChange} />
      </Stack>
      <Stack direction='column' sx={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
   
      <Button variant='contained' onClick={() => { props.setPage(''); }} >Save</Button>
      </Stack>
      </Paper>

    </form> }
    </ThemeProvider> 
  );
};

export default DeviceForm;
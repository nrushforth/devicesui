import * as React from 'react';
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Menu as MenuIcon } from '@material-ui/icons';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';

export default function AppNavBar(props) {

  const [login, setLogin] = useState("LOGIN");

  const handleButtonClick = () =>
  {
    props.setPage("MAIN_PAGE");
    setLogin('HOME');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background: '#006A4D'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="devicesothericon"
            sx={{ mr: 2 }}
          >
            <DevicesOtherIcon fontSize='large'/>
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Lloyds Device Management Portal
          </Typography>
          <Button variant="contained" color="success" onClick={handleButtonClick}>{login}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
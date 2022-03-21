import React , { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Box, Container, CssBaseline, TextField, Stack } from '@mui/material';
import { Button } from '@mui/material';

export default function DataTable(props) {

  const [Devices, fetchDevices] = useState([])
  const [filter, setFilter] = useState('');

  const getData = () => {
    console.log('getting data');
    fetch('http://localhost:3000/api/devices')
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        fetchDevices(res)
      });
  }

  useEffect(() => {
    getData();
  }, [])

const getFilteredData = () => {
  console.log('getting filtered data');
  fetch('http://localhost:3000/api/devices?deviceEnergyRating=' + filter)
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      fetchDevices(res)
    });
}

const handleTextFieldChange = (event) => {
  console.log(event.target.id);

  switch(event.target.id)
  {
    case "energyRatingFilter":
      setFilter(event.target.value);
      break;
      default:
        break;
  }
}

const columns = [
  { field: '_id', headerName: 'ID', width: 200 },
  { field: 'deviceType', headerName: 'Device Type', width: 130 },
  { field: 'deviceDescription', headerName: 'Description', width: 200 },
  { field: 'deviceOwner', headerName: 'Owner', width: 200 },
  { field: 'deviceSerialNumber', headerName: 'Serial Number', width: 150 },
  {
    field: 'deviceEnergyRating',
    headerName: 'Energy Rating',
    type: 'number',
    width: 150,
  },
  {
    field: 'deviceLocation',
    headerName: 'Location',
    description: 'xxxxxxxxxxxx',
    width: 160,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

    return (
      <Container component="main" maxWidth="s" sx={{  height:'550px' }}>
            <CssBaseline />
            <Stack
  direction="row"
  justifyContent="flex-start"
  alignItems="flex-start"
  spacing={1}
>
                  <TextField id="energyRatingFilter"  label="Filter by Energy Rating" size="small" onChange={handleTextFieldChange} ></TextField>
                  <Button variant='contained' onClick={getFilteredData}>Filter</Button>

                </Stack>
                <DataGrid
                     onCellDoubleClick={(params, event) => {
                      alert('Help');
                    }}
                    onRowClick={(params,event) => { props.setPage('OTHER_PAGE#' + params.id + '#Update');}
                  }
                getRowId={row => row._id}  
                rows={Devices}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection     
                rowHeight={40}
                sx={{ mt:'10px'}}
                />
                <Button onClick={() => { props.setPage('OTHER_PAGE##Add')}} variant='contained'>Add Device</Button>
            
            </Container>
        
  );
}
import React , { useState, useEffect } from 'react';
import { DataGrid, GridValueFormatterParams } from '@mui/x-data-grid';
import { Container, CssBaseline, Paper, TextField, Stack } from '@mui/material';
import { Button } from '@mui/material';

export default function DataTable(props) {

  const [Devices, fetchDevices] = useState([])
  const [filter, setFilter] = useState('');

 async function getData() {
    console.log('getting data');
    await fetch('http://localhost:3000/api/devices')
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        fetchDevices(res)
      });
  }

  useEffect(() => {
    getData();
  }, [])

async function getFilteredData()  {
  console.log('getting filtered data ' + filter);
  await fetch('http://localhost:3000/api/devices' +  (filter !== null && filter !== '' ? '?deviceEnergyRating=' + filter : ''))
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      fetchDevices(res)
    });
}

async function clearFilter() {
  setFilter('');
   getData();
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

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    padTo2Digits(date.substring(8,10)),
    padTo2Digits(date.substring(5,7)),
    date.substring(0,4)].join('/');
}

const columns = [
  { field: '_id', headerName: 'ID', width: 200, hide: true },
  { field: 'deviceType', headerName: 'Device Type', width: 110 },
  { field: 'deviceDescription', headerName: 'Description', width: 250 },
  { field: 'deviceOwner', headerName: 'Owner', width: 150 },
  { field: 'deviceSerialNumber', headerName: 'Serial Number', width: 150 },
  {
    field: 'deviceEnergyRating',
    headerName: 'Energy Rating',    
    width: 120,
  },
  {
    field: 'deviceLocation',
    headerName: 'Location',
    description: 'xxxxxxxxxxxx',
    width: 120,
  },
  {
    field: 'deviceInstalled',
    headerName: 'Installed Date ',
    description: 'xxxxxxxxxxxx',
    width: 120,
    valueFormatter: (params) => {
      const valueFormatted = formatDate(params.value);
      return `${valueFormatted}`;
    }
  },
  // {
  //     headerName: 'Click',
  //     width: 90,
  //     renderCell: (params) => (
  //     // you will find row info in params
  //     <Button variant='contained' size='small' color='success' onClick={(params) => { alert('delete ' + params.id ); }}>DELETE</Button>
  //     ),
  // },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

    return (
      <Paper elevation={3} sx={{  height:'650px', m:'15px', pt:'20px', pb:'20px' }} >   
      <Container component="main" maxWidth="s" sx={{  height:'550px',
     '& .A': {
      backgroundColor: '#107e40',
      color: '#ffffff',
      fontWeight:"bold",
    },
    '& .B': {
      backgroundColor: '#329e31',
      color: '#ffffff',
      fontWeight:"bold",
    },
    '& .C': {
      backgroundColor: '#92c947',
      color: '#ffffff',
      fontWeight:"bold",
    },
    '& .D': {
      backgroundColor: '#fef035',
      color: '#ffffff',
      fontWeight:"bold",
    },
    '& .E': {
      backgroundColor: '#f4ae34',
      color: '#ffffff',
      fontWeight:"bold",
    },    
    '& .F': {
      backgroundColor: '#eb6930',
      color: '#ffffff',
      fontWeight:"bold",
    },
    '& .G': {
      backgroundColor: '#e0202c',
      color: '#ffffff',
      fontWeight:"bold",
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: "rgba(225,225,225,0.5)",
      fontWeight: "bold",
      color: '#333333'
    },}
  }>
                
            <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
                  <TextField value={filter} id="energyRatingFilter"  label="Filter by Energy Rating" size="small" onChange={handleTextFieldChange} ></TextField>
                  <Button variant="contained" color="success" onClick={getFilteredData}>Filter</Button>
                  <Button variant="contained" color="success" onClick={clearFilter}>Clear Filter</Button>
                </Stack>
                <DataGrid
                     onCellDoubleClick={(params, event) => {
                      alert('Help');
                    }}
                    onRowClick={(params,event) => { props.setPage('OTHER_PAGE#' + params.id + '#Update');}
                  }
                getRowId={row => row._id}  
                getCellClassName={(params) => {
                  if (params.field === 'deviceEnergyRating')
                  return params.value;
                }}
                rows={Devices}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection     
                rowHeight={40}
                sx={{ mt:'10px'}}
                />
                <Button sx={{ mt:'10px'}} onClick={() => { props.setPage('OTHER_PAGE##Add')}} variant="contained" color="success">Add Device</Button>
                
            </Container>
            </Paper> 
        
  );
}
import React , { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Alert } from '@mui/material';

export default function DataTable() {

  const [Devices, fetchDevices] = useState([])

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

const columns = [
  { field: '_id', headerName: 'ID', width: 70 },
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
        <div style={{padding:'5%', width:'90%'}}>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                     onCellDoubleClick={(params, event) => {
                      alert('Help');
                    }}
                    onRowClick={(params,event) => { alert('click' + params.id);}
                  }
                getRowId={row => row._id}  
                rows={Devices}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection     
                />
            </div>
        </div>
  );
}
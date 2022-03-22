import './App.css';
import DataTable from './DataTable';
import { Typography } from '@mui/material';

function Home(props) {
  return (
    <div>
      
        
        {/* <Button onClick={() => { props.setPage('OTHER_PAGE#62386f0b3773efcaf46fdd19#Update')}} variant='contained'>Hello World</Button> */}
        <Typography component="div" variant="h5" sx={{m:'10px'}}>&nbsp;&nbsp;Devices</Typography>
        <DataTable setPage={ props.setPage } />        
      
    </div>
  );
}

export default Home;
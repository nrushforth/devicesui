import logo from './logo.svg';
import './App.css';
import DataTable from './DataTable';
import { Button } from '@mui/material';

function Home(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. ????!!!!?????
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button onClick={() => { props.setPage('OTHER_PAGE')}} variant='contained'>Hello World</Button>
        <DataTable/>        
      </header>
    </div>
  );
}

export default Home;
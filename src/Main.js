import { useState } from "react";
import DeviceForm from "./DeviceForm";
import { Button } from "@mui/material";
import AppNavBar from "./NavBar";
import Home from "./Home";
import Open from "./Open";


function Main(){
    const [page, setPage] = useState("");
    
    if(page==='') setPage("OPEN_PAGE");

    let pageProps = page.split('#');

    console.log(pageProps[0]);
    console.log(pageProps[1]);
    console.log(pageProps[2]);

    return(
      
      <header>
        <AppNavBar setPage={setPage} />
            {/* <Button onClick={() => setPage("MAIN_PAGE")}> 
                Change to main page                 
            </Button>
            <Button variant="contained"  color="success" onClick={() => setPage("OTHER_PAGE##Add")}> 
               Change to other page 
            </Button> */}
            
            {page === "MAIN_PAGE" ? <Home setPage={setPage} /> : null}
            {page === "OPEN_PAGE" ? <Open setPage={setPage} /> : null}
            {page.substring(0,10) === "OTHER_PAGE" ? <DeviceForm setPage={setPage} id={ pageProps[1] } mode={ pageProps[2] }  /> : null}
      </header>
    )
    
  }

  export default Main;
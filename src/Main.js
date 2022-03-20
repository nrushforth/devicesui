import { useState } from "react";
import DeviceForm from "./DeviceForm";
import { Button } from "@mui/material";
import Home from "./Home";


function Main(){
    const [page, setPage] = useState("");
    
    if(page==='') setPage("MAIN_PAGE");

    return(
      <header>
            <Button onClick={() => setPage("MAIN_PAGE")}> 
                Change to main page                 
            </Button>
            <Button variant="contained"  color="success" onClick={() => setPage("OTHER_PAGE")}> 
               Change to other page 
            </Button>
            
            {page === "MAIN_PAGE" ? <Home setPage={setPage} /> : null}
            {page === "OTHER_PAGE" ? <DeviceForm setPage={setPage} /> : null}
      </header>
    )
    
  }

  export default Main;
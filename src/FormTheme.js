import { createTheme } from "@mui/material/styles";

const FormTheme = createTheme({
  
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          margin: 5
        }
      }
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: 5, padding: '50px 50px 50x 50px'
        }
      }
    }
  }
});

export { FormTheme };
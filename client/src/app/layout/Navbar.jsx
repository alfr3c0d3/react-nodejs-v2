import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { NavLink } from "react-router-dom";

// const linkStyle = {
//   textDecoration: "none", // Remove underline
//   color: "inherit"
// };

const NavBar = () => {
  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar>
          {/* <Typography component={NavLink} to="/" variant="h6" sx={{ flexGrow: 1 }} style={linkStyle}>
            Airac File Process
          </Typography> */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Airac Cycle
          </Typography>
          <Button component={NavLink} to="/airac-files" color="inherit">
            Airac Files
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;

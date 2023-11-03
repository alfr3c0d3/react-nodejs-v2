import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search"; // Import the correct SearchIcon

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <SearchIcon fontSize="large" color="action" />
      <Typography variant="h4" component="div" align="center">
        Oops - we've looked everywhere but couldn't find this.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Return to Home page
      </Button>
    </Container>
  );
};

export default NotFound;
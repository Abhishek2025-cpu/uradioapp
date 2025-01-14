import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import logo from '../assests/applogo.png';

const Header = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("bearerToken");
    navigate("/");
  };

  return (
    <AppBar position="fixed" sx={{ background: "#182433", width: "100%" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
        <img src={logo} alt="App Logo" style={{ width: 50, marginRight: 10,borderRadius:"50%",marginLeft:"20px" }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
        
        </Typography>
        <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

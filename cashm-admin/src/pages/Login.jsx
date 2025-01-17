import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import {  keyframes } from "@mui/system";

// Add your logo here
import logo from "../assests/cashm_logo.png";

const Logo = styled("img")({
  width: "150px",
  marginBottom: "1rem",
});

const CustomContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #2150d1, #14378e)",
  padding: 0,
  margin: 0,
  width: "100%",
  overflow: "hidden",
  position: "absolute",
  top: 0,
  left: 0,
});

const CustomBox = styled(Box)({
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
  maxWidth: "400px",
  width: "100%",
});

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateLogin = () => {
    if (username === "Pearl" && password === "PearlProdChecker@12390") {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };
  
  const fadeInSlideUp = keyframes
  ` from { opacity: 0; transform: translateY(20px); }
   to
    { opacity: 1; transform: translateY(0); } `;


 const AnimatedTypography = styled(Typography)
 ` animation: ${fadeInSlideUp} 1s ease-in-out;
  color: #2150d1; font-weight: bold; `;

  return (
    <CustomContainer>
      <CustomBox>
        <Logo src={logo} alt="Logo" />
        <AnimatedTypography variant="h4" component="h2" gutterBottom> Admin </AnimatedTypography>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={validateLogin}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </CustomBox>
    </CustomContainer>
  );
};

export default Login;

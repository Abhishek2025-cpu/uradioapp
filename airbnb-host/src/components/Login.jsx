import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Box, Alert, IconButton, InputAdornment, Snackbar, Typography, Checkbox, FormControlLabel, Link } from "@mui/material";
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import AirbnbLogo from '../assests/applogo.png';
import image1 from '../assests/image1.jpg';
import image2 from '../assests/on_boarding_3.jpg';
import image3 from '../assests/imagef.webp';
import image4 from '../assests/images.webp';

const override = css`
  display: block;
  margin: 0 auto;
`;

const images = [image1, image2, image3, image4];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");
    setSuccess("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all required fields.");
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("password", password);
    data.append("email", email);

    axios.post("https://api.pilling.in/api/login", data)
      .then((response) => {
        const { status, message, uid } = response.data;
        if (status === 200) {
          localStorage.setItem("bearerToken", uid);
          setSuccess("Login successful!");
          setTimeout(() => {
            setLoading(false);
            navigate("/dashboard");
          }, 2000);
        } else {
          setError("Invalid credentials");
          setSnackbarOpen(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError("Login failed. Please try again.");
        setSnackbarOpen(true);
        setLoading(false);
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = images.indexOf(currentImage);
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentImage(images[nextIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      position: 'relative', 
      background: `url(${currentImage}) no-repeat center center/cover`, 
      transition: 'background 1s ease-in-out'
    }}>
      <Box 
        sx={{ 
          width: '25%', 
          height:"100vh",
          padding: 4,
          position:'absolute',
          left:'0',
          bottom:1,
          boxShadow: 3,
          backgroundColor: '#182433',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img src={AirbnbLogo} style={{ height: "50px", width: "50px", borderRadius: "50%", marginBottom: "10px" }} />
        <Typography variant="h5" gutterBottom sx={{ color: '#F5F5F5', fontSize: "16px" }}> 
          Sign In Below 
        </Typography> 
        {error && <Alert severity="error">{error}</Alert>} 
        {success && <Alert severity="success">{success}</Alert>} 
        <TextField 
          label="Email/Username" 
          fullWidth 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          sx={{ mb: 2 }} 
          placeholder="Enter your username or email address" 
          InputLabelProps={{ style: { color: '#F5F5F5' } }} 
          InputProps={{ style: { color: '#F5F5F5' } }} 
        /> 
        <TextField 
          label="Password" 
          type={showPassword ? "text" : "password"} 
          fullWidth 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          sx={{ mb: 2 }} 
          placeholder="Enter your password" 
          InputLabelProps={{ style: { color: '#F5F5F5' } }} 
          InputProps={{ 
            endAdornment: ( 
              <InputAdornment position="end"> 
                <IconButton 
                  aria-label="toggle password visibility" 
                  onClick={handleClickShowPassword} 
                  sx={{ color: '#F5F5F5' }}
                > 
                  {showPassword ? <VisibilityOff /> : <Visibility />} 
                </IconButton> 
              </InputAdornment> 
            ), 
            style: { color: '#F5F5F5' } 
          }} 
        /> 
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2 }}> 
          <FormControlLabel 
            control={<Checkbox name="rememberMe" sx={{ color: '#F5F5F5' }} />} 
            label="Remember me?" 
            sx={{ color: '#F5F5F5' }} 
          /> 
          <Link href="#" variant="body2" underline="hover" sx={{ color: '#F5F5F5' }}> 
            Lost your password? 
          </Link> 
        </Box>
        <Button 
          variant="contained" 
          sx={{ 
            mt:5,
            backgroundColor: " #651E7C", 
            color: "#fff", 
            '&:hover': {
              backgroundColor: " #00C49F",
            },
            mb: 2
          }} 
          fullWidth 
          onClick={handleLogin}
          disabled={loading}
          startIcon={<LoginIcon />}
        >
          {loading ? <ClipLoader color="#fff" loading={loading} css={override} size={24} /> : 'Sign in'}
        </Button>
        <Typography variant="caption" display="block" gutterBottom sx={{ color: '#F5F5F5' }}>
          Pilling © 2025 Pilling. Version 1.42.1
        </Typography>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={error}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          ContentProps={{ sx: { backgroundColor: 'red' } }}
        />
      </Box>
    </Box>
  );
};

export default Login;




// import React, { useState,useEffect } from "react";
// import { Container, TextField, Button, Box, Alert, IconButton, InputAdornment, Snackbar, Typography, Checkbox, FormControlLabel, Link } from "@mui/material";
// import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
// import { useNavigate } from "react-router-dom";
// import { css } from "@emotion/react";
// import { ClipLoader } from "react-spinners";
// import axios from "axios";
// import AirbnbLogo from '../assests/applogo.png';

// const override = css`
//   display: block;
//   margin: 0 auto;
// `;

// const images = [
//   'https://source.unsplash.com/random/800x600',
//   'https://source.unsplash.com/random/801x601',
//   'https://source.unsplash.com/random/802x602',
//   'https://source.unsplash.com/random/803x603',
// ];

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [randomImage, setRandomImage] = useState(images[0]);
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     if (!email || !password) {
//       setError("Please fill in all required fields.");
//       setSnackbarOpen(true);
//       setLoading(false);
//       return;
//     }

//     const data = new FormData();
//     data.append("password", password);
//     data.append("email", email);

//     axios.post("https://api.pilling.in/api/login", data)
//       .then((response) => {
//         const { status, message, uid } = response.data;
//         if (status === 200) {
//           localStorage.setItem("bearerToken", uid);
//           setSuccess("Login successful!");
//           setTimeout(() => {
//             setLoading(false);
//             navigate("/dashboard");
//           }, 2000);
//         } else {
//           setError("Invalid credentials");
//           setSnackbarOpen(true);
//           setLoading(false);
//         }
//       })
//       .catch((error) => {
//         setError("Login failed. Please try again.");
//         setSnackbarOpen(true);
//         setLoading(false);
//       });
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const randomIndex = Math.floor(Math.random() * images.length);
//       setRandomImage(images[randomIndex]);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//    <>
   
//       <Box 
//         sx={{ 
//           width: '25%',
//           height:"100vh",
//           padding: 4,
//           position:'absolute',
//           left:'0',
//        bottom:1,
          
     
//           boxShadow: 3,
//           backgroundColor: '#182433',
//           textAlign: 'center',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }}
//       >
//         <img src={AirbnbLogo} style={{ height: "50px", width: "50px", borderRadius: "50%", marginBottom: "10px" }} />
//         <Typography variant="h5" gutterBottom sx={{ color: '#F5F5F5',fontSize:"16px" }}> Sign In Below </Typography> {error && <Alert severity="error">{error}</Alert>} {success && <Alert severity="success">{success}</Alert>} <TextField label="Email/Username" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} placeholder="Enter your username or email address" InputLabelProps={{ style: { color: '#F5F5F5' } }} InputProps={{ style: { color: '#F5F5F5' } }} /> <TextField label="Password" type={showPassword ? "text" : "password"} fullWidth value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} placeholder="Enter your password" InputLabelProps={{ style: { color: '#F5F5F5' } }} InputProps={{ endAdornment: ( <InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} > {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment> ), style: { color: '#F5F5F5' } }} /> <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2 }}> <FormControlLabel control={<Checkbox name="rememberMe" sx={{ color: '#F5F5F5' }} />} label="Remember me?" sx={{ color: '#F5F5F5' }} /> <Link href="#" variant="body2" underline="hover" sx={{ color: '#F5F5F5' }}> Lost your password? </Link> </Box>
//         <Button 
//           variant="contained" 
//           sx={{ 
//             mt:5,
//             backgroundColor: " #651E7C", 
//             color: "#fff", 
//             '&:hover': {
//               backgroundColor: " #00C49F",
//             },
//             mb: 2
//           }} 
//           fullWidth 
//           onClick={handleLogin}
//           disabled={loading}
//           startIcon={<LoginIcon />}
//         >
//           {loading ? <ClipLoader color="#fff" loading={loading} css={override} size={24} /> : 'Sign in'}
//         </Button>
//         <Typography variant="caption" display="block" gutterBottom sx={{ color: '#F5F5F5' }}>
//           Pilling © 2025 Pilling. Version 1.42.1
//         </Typography>
//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}
//           message={error}
//           anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//           ContentProps={{ sx: { backgroundColor: 'red' } }}
//         />
//       </Box>
//       <Box sx={{ flex: 1 }}>
//         <img src={randomImage} alt="Random" style={{ width: '100%', height: 'auto' }} />
//       </Box>
//       </>
 
//   );
// };

// export default Login;
















// import React, { useState } from "react";
// import { Container, TextField, Button, Box, Alert, IconButton, InputAdornment, Snackbar,Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { css } from "@emotion/react";
// import { ClipLoader } from "react-spinners";
// import axios from "axios";
// import AirbnbLogo from '../assests/applogo.png';

// const override = css`
//   display: block;
//   margin: 0 auto;
// `;

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [showEmail, setShowEmail] = useState(true);
//   const [showPhoneNumber, setShowPhoneNumber] = useState(true);
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     if ((!email && showEmail) || (!phoneNumber && showPhoneNumber) || !password) {
//       setError("Please fill in all required fields.");
//       setSnackbarOpen(true);
//       setLoading(false);
//       return;
//     }

//     const data = new FormData();
//     data.append("password", password);
//     data.append("phoneNumber", phoneNumber || "");
//     data.append("email", email || "");

//     axios.post("https://api.pilling.in/api/login", data)
//       .then((response) => {
//         const { status, message, uid } = response.data;
//         if (status === 200) {
//           localStorage.setItem("bearerToken", uid);
//           setSuccess("Login successful!");
//           setTimeout(() => {
//             setLoading(false);
//             navigate("/dashboard");
//           }, 2000);
//         } else {
//           setError("Invalid credentials");
//           setSnackbarOpen(true);
//           setLoading(false);
//         }
//       })
//       .catch((error) => {
//         setError("Login failed. Please try again.");
//         setSnackbarOpen(true);
//         setLoading(false);
//       });
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <Container 
//       sx={{ 
//      width:"100%",
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'Left',
//         backgroundColor: '#182433',
//         minHeight: '100vh',
//         justifyContent: 'center'
//       }}
//     >
//       <img src={AirbnbLogo} style={{ height: "100px", width: "100px", borderRadius: "50%", marginBottom: "10px" }} />

//       <Box 
//         sx={{ 
//           maxWidth: 400, 
//           width: '100%',
//           padding: 4,
//           borderRadius: 2,
//           boxShadow: 3,
//           backgroundColor: '#fff',
//           textAlign: 'center'
//         }}
//       >
//         {error && <Alert severity="error">{error}</Alert>}
//         {success && <Alert severity="success">{success}</Alert>}

//         {showEmail && (
//           <TextField
//             label="Email"
//             fullWidth
//             value={email}
//             onClick={() => setShowPhoneNumber(false)}
//             onChange={(e) => setEmail(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//         )}

//         {showEmail && showPhoneNumber && (
//           <Typography variant="subtitle1" align="center">OR</Typography>
//         )}

//         {showPhoneNumber && (
//           <TextField
//             label="Phone Number"
//             fullWidth
//             value={phoneNumber}
//             onClick={() => setShowEmail(false)}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//         )}

//         <TextField
//           label="Password"
//           type={showPassword ? "text" : "password"}
//           fullWidth
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           sx={{ mb: 2 }}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   onClick={handleClickShowPassword}
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />

//         <Button 
//           variant="contained" 
//           sx={{ 
//             backgroundColor: " #00C49F", 
//             color: "#fff", 
//             '&:hover': {
//               backgroundColor: " #651E7C",
//             },
//             mb: 2
//           }} 
//           fullWidth 
//           onClick={handleLogin}
//           disabled={loading}
//         >
//           {loading ? <ClipLoader color="#fff" loading={loading} css={override} size={24} /> : 'Login'}
//         </Button>

//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}
//           message={error}
//           anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//           ContentProps={{ sx: { backgroundColor: 'red' } }}
//         />
//       </Box>
//     </Container>
//   );
// };

// export default Login;

import image1 from '../assests/image1.jpg';
import image2 from '../assests/imagef.webp';
import image3 from '../assests/images.webp';
import image4 from '../assests/on_boarding_3.jpg';

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Typography, Container, Chip, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
import Header from './Header';
import Sidebar from './Sidebar';




const createData = (id, propertyName, address, about, amenities, image) => {
  return { id, propertyName, address, about, amenities, image };
}

const rows = [
  createData(1, 'Gateway Residency', 'Mumbai, Maharashtra', 'A modern apartment with sea view', ['WiFi', 'Parking', 'Gym'], image1),
  createData(2, 'Taj Villa', 'Agra, Uttar Pradesh', 'A luxury villa near Taj Mahal', ['Pool', 'Garden', 'Sauna'], image2),
  createData(3, 'Palace View', 'Jaipur, Rajasthan', 'A beautiful palace view apartment', ['WiFi', 'Air Conditioning', 'Parking'], image3),
  createData(4, 'Beachfront Paradise', 'Goa', 'A cozy beach house with a private beach', ['WiFi', 'Pool', 'Barbecue'], image4),
];

const AllPropertiesInteractive = () => {
  const [properties, setProperties] = useState(rows);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setSelectedImage(property.image);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (property) => {
    setSelectedProperty(property);
    setDeleteDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setSelectedProperty(null);
    setSelectedImage(null);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setSelectedProperty(null);
  };

  const handleSaveChanges = () => {
    setProperties((prevProperties) => 
      prevProperties.map((prop) => 
        prop.id === selectedProperty.id ? { ...selectedProperty, image: selectedImage } : prop
      )
    );
    setEditDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    setProperties((prevProperties) => 
      prevProperties.filter((prop) => prop.id !== selectedProperty.id)
    );
    setDeleteDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedProperty({ ...selectedProperty, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
    <Header/>
    <Sidebar/>
    
    <Container sx={{ height: '100vh', width: '100vw', backgroundColor: '#2D3847', padding: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#F5F5F5', textAlign: 'center' }}>
        Available Properties
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3, backgroundColor: '#2D3847' }}>
        <Table sx={{ minWidth: 650 }} aria-label="properties table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#2D3847' }}>
              <TableCell align="center" sx={{ color: '#F5F5F5' }}>Image</TableCell>
              <TableCell align="center" sx={{ color: '#F5F5F5' }}>Property Name</TableCell>
              <TableCell align="center" sx={{ color: '#F5F5F5' }}>Address</TableCell>
              <TableCell align="center" sx={{ color: '#F5F5F5' }}>About</TableCell>
              <TableCell align="center" sx={{ color: '#F5F5F5' }}>Amenities</TableCell>
              <TableCell align="center" sx={{ color: '#F5F5F5' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.map((row) => (
              <TableRow key={row.propertyName} sx={{ backgroundColor: '#2D3847' }}>
                <TableCell align="center">
                  <CardMedia
                    component="img"
                    image={row.image}
                    alt={row.propertyName}
                    sx={{ width: 100, height: 60, objectFit: 'cover', borderRadius: 1 }}
                  />
                </TableCell>
                <TableCell align="center" sx={{ color: '#F5F5F5' }}>{row.propertyName}</TableCell>
                <TableCell align="center" sx={{ color: '#F5F5F5' }}>{row.address}</TableCell>
                <TableCell align="center" sx={{ color: '#F5F5F5' }}>{row.about}</TableCell>
                <TableCell align="center" sx={{ color: '#F5F5F5' }}>
                  {row.amenities.map((amenity, index) => (
                    <Chip key={index} label={amenity} size="small" sx={{ margin: '2px', color: '#F5F5F5', backgroundColor: '#3E4A61' }} />
                  ))}
                </TableCell>
                <TableCell align="center">
                  <IconButton aria-label="edit" sx={{ color: '#00C49F' }} onClick={() => handleEditClick(row)}>
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="delete" sx={{ color: '#FF6F61' }} onClick={() => handleDeleteClick(row)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Property</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="propertyName"
            label="Property Name"
            type="text"
            fullWidth
            value={selectedProperty?.propertyName || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            type="text"
            fullWidth
            value={selectedProperty?.address || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="about"
            label="About"
            type="text"
            fullWidth
            value={selectedProperty?.about || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="amenities"
            label="Amenities (comma separated)"
            type="text"
            fullWidth
            value={selectedProperty?.amenities.join(', ') || ''}
            onChange={(event) => setSelectedProperty({ ...selectedProperty, amenities: event.target.value.split(',').map(item => item.trim()) })}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-image"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="upload-image">
            <Button variant="contained" color="primary" component="span">
              Upload Image
            </Button>
          </label>
          {selectedImage && (
            <CardMedia
              component="img"
              image={selectedImage}
              alt={selectedProperty?.propertyName}
              sx={{ width: 100, height: 60, objectFit: 'cover', borderRadius: 1, marginTop: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSaveChanges} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
        <DialogTitle>Delete Property</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this property?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
      </Container> 
      </>
      );
     };

export default AllPropertiesInteractive;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Card,
//   CardContent,
//   Typography,
//   CardMedia,
//   Grid,
//   Chip,
//   CircularProgress,
//   Container,
// } from '@mui/material';

// const AllProperties = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchProperties = async () => {
//     const token =
//       'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2OTY5Njk2OTY5IiwiaWF0IjoxNzM2NzcyMDE0fQ.9zbl1chXoKqYIFhgh9SAmmZHpJzELYlOSZl4VAcJUWc';
//     try {
//       const response = await axios.get('https://api.pilling.in/host/all', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setProperties(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to fetch properties. Please try again later.');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   if (loading) {
//     return (
//       <Container style={{ textAlign: 'center', marginTop: '2rem' }}>
//         <CircularProgress />
//         <Typography variant="h6" style={{ marginTop: '1rem' }}>
//           Loading properties...
//         </Typography>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container style={{ textAlign: 'center', marginTop: '2rem' }}>
//         <Typography variant="h6" color="error">
//           {error}
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Typography variant="h4" style={{ margin: '2rem 0' }}>
//         Available Properties
//       </Typography>
//       <Grid container spacing={3}>
//         {properties.map((property) => (
//           <Grid item xs={12} sm={6} md={4} key={property.id}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={property.photos[0] || 'https://via.placeholder.com/200'}
//                 alt={property.propertyName}
//               />
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   {property.propertyName}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {property.address}
//                 </Typography>
//                 <Typography variant="body2" style={{ margin: '0.5rem 0' }}>
//                   {property.about}
//                 </Typography>
//                 <Grid container spacing={1}>
//                   {property.amenities.map((amenity, index) => (
//                     <Grid item key={index}>
//                       <Chip label={amenity} size="small" />
//                     </Grid>
//                   ))}
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default AllProperties;

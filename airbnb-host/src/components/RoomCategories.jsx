import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Typography, Container, Chip, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
import Header from './Header';
import Sidebar from './Sidebar';

const createCategoryData = (id, roomType, amenities, pricePerNight) => {
  return { id, roomType, amenities, pricePerNight };
};

const categories = [
  createCategoryData(1, 'Single Room', ['WiFi', 'Air Conditioning', 'TV'], '₹2000'),
  createCategoryData(2, 'Double Room', ['WiFi', 'Air Conditioning', 'TV', 'Mini Bar'], '₹3500'),
  createCategoryData(3, 'Suite', ['WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Living Area'], '₹7000'),
  createCategoryData(4, 'Deluxe Suite', ['WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Living Area', 'Jacuzzi'], '₹10000'),
];

const RoomCategories = () => {
  const [categoriesData, setCategoriesData] = useState(categories);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setSelectedCategory(null);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setSelectedCategory(null);
  };

  const handleSaveChanges = () => {
    setCategoriesData((prevCategories) =>
      prevCategories.map((category) =>
        category.id === selectedCategory.id ? selectedCategory : category
      )
    );
    setEditDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    setCategoriesData((prevCategories) =>
      prevCategories.filter((category) => category.id !== selectedCategory.id)
    );
    setDeleteDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedCategory({ ...selectedCategory, [name]: value });
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Container sx={{ height: '100vh', width: '100vw', backgroundColor: '#2D3847', padding: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#F5F5F5', textAlign: 'center' }}>
          Room Categories
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 3, backgroundColor: '#2D3847' }}>
          <Table sx={{ minWidth: 650 }} aria-label="room categories table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#2D3847' }}>
                <TableCell align="center" sx={{ color: '#F5F5F5' }}>Room Type</TableCell>
                <TableCell align="center" sx={{ color: '#F5F5F5' }}>Amenities</TableCell>
                <TableCell align="center" sx={{ color: '#F5F5F5' }}>Price Per Night</TableCell>
                <TableCell align="center" sx={{ color: '#F5F5F5' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoriesData.map((category) => (
                <TableRow key={category.id} sx={{ backgroundColor: '#2D3847' }}>
                  <TableCell align="center" sx={{ color: '#F5F5F5' }}>{category.roomType}</TableCell>
                  <TableCell align="center" sx={{ color: '#F5F5F5' }}>
                    {category.amenities.map((amenity, index) => (
                      <Chip key={index} label={amenity} size="small" sx={{ margin: '2px', color: '#F5F5F5', backgroundColor: '#3E4A61' }} />
                    ))}
                  </TableCell>
                  <TableCell align="center" sx={{ color: '#F5F5F5' }}>{category.pricePerNight}</TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="edit" sx={{ color: '#00C49F' }} onClick={() => handleEditClick(category)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" sx={{ color: '#FF6F61' }} onClick={() => handleDeleteClick(category)}>
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
          <DialogTitle>Edit Room Category</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="roomType"
              label="Room Type"
              type="text"
              fullWidth
              value={selectedCategory?.roomType || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="amenities"
              label="Amenities (comma separated)"
              type="text"
              fullWidth
              value={selectedCategory?.amenities.join(', ') || ''}
              onChange={(event) => setSelectedCategory({ ...selectedCategory, amenities: event.target.value.split(',').map(item => item.trim()) })}
            />
            <TextField
              margin="dense"
              name="pricePerNight"
              label="Price Per Night"
              type="text"
              fullWidth
              value={selectedCategory?.pricePerNight || ''}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handleSaveChanges} color="primary">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
          <DialogTitle>Delete Room Category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this room category?
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

export default RoomCategories;

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Typography, Container, Chip, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
import Header from './Header';
import Sidebar from './Sidebar';

const createBookingData = (id, guestName, checkInDate, checkOutDate, status) => {
  return { id, guestName, checkInDate, checkOutDate, status };
};

const bookings = [
  createBookingData(1, 'John Doe', '2025-01-10', '2025-01-15', 'Paid'),
  createBookingData(2, 'Jane Smith', '2025-02-01', '2025-02-05', 'Unpaid'),
  createBookingData(3, 'Michael Brown', '2025-03-20', '2025-03-25', 'Paid'),
  createBookingData(4, 'Emily Davis', '2025-04-10', '2025-04-15', 'Unpaid'),
];

const Booking = () => {
  const [bookingsData, setBookingsData] = useState(bookings);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleEditClick = (booking) => {
    setSelectedBooking(booking);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setDeleteDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setSelectedBooking(null);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setSelectedBooking(null);
  };

  const handleSaveChanges = () => {
    setBookingsData((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === selectedBooking.id ? selectedBooking : booking
      )
    );
    setEditDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    setBookingsData((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== selectedBooking.id)
    );
    setDeleteDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedBooking({ ...selectedBooking, [name]: value });
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Container sx={{ height: '100vh', width: '100vw', backgroundColor: '#2D3847', padding: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#F5F5F5', textAlign: 'center' }}>
          Booking Information
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 3, backgroundColor: '#2D3847' }}>
          <Table sx={{ minWidth: 650 }} aria-label="booking table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#2D3847' }}>
                <TableCell align="center" sx={{ color: '#F5F5F5' }}>Guest Name</TableCell>
                <TableCell align="center" sx={{ color: '#F5F5F5' }}>Check-In Date</TableCell>
                <TableCell align="center" sx={{ color: '#F5F5F5' }}>Check-Out Date</TableCell>
                <TableCell align="center" sx={{ color: '#F5F5F5' }}>Status</TableCell>
                <TableCell align="center" sx={{ color: '#F5F5F5' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookingsData.map((booking) => (
                <TableRow key={booking.id} sx={{ backgroundColor: '#2D3847' }}>
                  <TableCell align="center" sx={{ color: '#F5F5F5' }}>{booking.guestName}</TableCell>
                  <TableCell align="center" sx={{ color: '#F5F5F5' }}>{booking.checkInDate}</TableCell>
                  <TableCell align="center" sx={{ color: '#F5F5F5' }}>{booking.checkOutDate}</TableCell>
                  <TableCell align="center" sx={{ color: booking.status === 'Paid' ? '#00C49F' : '#FF6F61' }}>
                    {booking.status}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="edit" sx={{ color: '#00C49F' }} onClick={() => handleEditClick(booking)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" sx={{ color: '#FF6F61' }} onClick={() => handleDeleteClick(booking)}>
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
          <DialogTitle>Edit Booking</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="guestName"
              label="Guest Name"
              type="text"
              fullWidth
              value={selectedBooking?.guestName || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="checkInDate"
              label="Check-In Date"
              type="date"
              fullWidth
              value={selectedBooking?.checkInDate || ''}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              name="checkOutDate"
              label="Check-Out Date"
              type="date"
              fullWidth
              value={selectedBooking?.checkOutDate || ''}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              name="status"
              label="Payment Status"
              type="text"
              fullWidth
              value={selectedBooking?.status || ''}
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
          <DialogTitle>Delete Booking</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this booking?
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

export default Booking;

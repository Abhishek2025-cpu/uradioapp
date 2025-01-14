import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const rooms = [
  {
    id: 8,
    image: 'https://via.placeholder.com/50x50',
    name: 'President Room',
    price: 154,
    order: 0,
    createdAt: '2024-08-05',
    status: 'Published',
  },
  {
    id: 7,
    image: 'https://via.placeholder.com/50x50',
    name: 'Luxury Suite',
    price: 179,
    order: 0,
    createdAt: '2024-08-05',
    status: 'Published',
  },
  // Add more room data...
  {
    id: 8,
    image: 'https://via.placeholder.com/50x50',
    name: 'President Room',
    price: 154,
    order: 0,
    createdAt: '2024-08-05',
    status: 'Published',
  },
  {
    id: 8,
    image: 'https://via.placeholder.com/50x50',
    name: 'President Room',
    price: 154,
    order: 0,
    createdAt: '2024-08-05',
    status: 'Published',
  },
  {
    id: 8,
    image: 'https://via.placeholder.com/50x50',
    name: 'President Room',
    price: 154,
    order: 0,
    createdAt: '2024-08-05',
    status: 'Published',
  },
  {
    id: 8,
    image: 'https://via.placeholder.com/50x50',
    name: 'President Room',
    price: 154,
    order: 0,
    createdAt: '2024-08-05',
    status: 'Published',
  },
  {
    id: 8,
    image: 'https://via.placeholder.com/50x50',
    name: 'President Room',
    price: 154,
    order: 0,
    createdAt: '2024-08-05',
    status: 'Published',
  },
  {
    id: 8,
    image: 'https://via.placeholder.com/50x50',
    name: 'President Room',
    price: 154,
    order: 0,
    createdAt: '2024-08-05',
    status: 'Published',
  },
];

const RoomsList = () => {
  const handleEdit = (id) => {
    console.log('Edit room with id:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete room with id:', id);
  };

  return (
    <Paper elevation={3} style={{ margin: '20px', padding: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Rooms
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>{room.id}</TableCell>
                <TableCell>
                  <img src={room.image} alt="Room" style={{ width: '50px' }} />
                </TableCell>
                <TableCell>{room.name}</TableCell>
                <TableCell>${room.price.toFixed(2)}</TableCell>
                <TableCell>{room.order}</TableCell>
                <TableCell>{room.createdAt}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    style={{ textTransform: 'none' }}
                  >
                    {room.status}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleEdit(room.id)}
                    size="small"
                    style={{ marginRight: '10px' }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDelete(room.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RoomsList;

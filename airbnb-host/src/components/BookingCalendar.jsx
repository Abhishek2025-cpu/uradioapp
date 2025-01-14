import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Paper, Typography, Container, Box, Button } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const localizer = momentLocalizer(moment);

const initialBookings = [
  {
    id: 1,
    title: 'John Doe',
    start: new Date(2025, 0, 10),
    end: new Date(2025, 0, 15),
    status: 'Paid',
  },
  {
    id: 2,
    title: 'Jane Smith',
    start: new Date(2025, 1, 1),
    end: new Date(2025, 1, 5),
    status: 'Unpaid',
  },
  {
    id: 3,
    title: 'Michael Brown',
    start: new Date(2025, 2, 20),
    end: new Date(2025, 2, 25),
    status: 'Paid',
  },
  {
    id: 4,
    title: 'Emily Davis',
    start: new Date(2025, 3, 10),
    end: new Date(2025, 3, 15),
    status: 'Unpaid',
  },
];

const eventStyleGetter = (event) => {
  const backgroundColor = event.status === 'Paid' ? '#00C49F' : '#FF6F61';
  const style = {
    backgroundColor,
    borderRadius: '5px',
    opacity: 0.8,
    color: 'white',
    border: '0px',
    display: 'block',
  };
  return {
    style,
  };
};

const BookingCalendar = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* <Header onToggleSidebar={handleSidebarToggle} /> */}
      <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />
      <Container sx={{ height: '90vh', width: '100vw', backgroundColor: '#2D3847', padding: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: '#00C49F', color: 'white', marginRight: 2 }}>
            Paid
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#FF6F61', color: 'white' }}>
            Unpaid
          </Button>
        </Box>
        <Paper sx={{ width: '100%', height: '80vh', padding: 3 }}>
          <Calendar
            localizer={localizer}
            events={bookings}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%', backgroundColor: '#fff' }}
            eventPropGetter={eventStyleGetter}
          />
        </Paper>
      </Container>
    </>
  );
};

export default BookingCalendar;

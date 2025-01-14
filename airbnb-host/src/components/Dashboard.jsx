import React, { useState } 
from 'react';
 import { Box, Grid, Paper, Typography, Modal, Backdrop, Fade, Card, CardMedia, CardContent }
  from '@mui/material'; 
  import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip as RechartTooltip, Legend } from 'recharts';
   import Sidebar from './Sidebar'; import Header from './Header'; 
   
   
   const Dashboard = () => { const [sidebarOpen, setSidebarOpen] = useState(true); 
    const [modalOpen, setModalOpen] = useState(false); 
    const [modalTitle, setModalTitle] = useState(""); 
    const [modalEntries, setModalEntries] = useState([]); 
    
    const handleDrawerToggle = () => { setSidebarOpen(!sidebarOpen); };
     const handleCardClick = (title, entries) => { setModalTitle(title); setModalEntries(entries); setModalOpen(true); }; const handleCloseModal = () => { setModalOpen(false); };
     const roomBookings = [ { id: 1, room: "Cambria Hotel New York", rent: 350, paymentStatus: "Unpaid" }, { id: 2, room: "Cambria Hotel New York", rent: 840, paymentStatus: "Unpaid" }, { id: 3, room: "Radisson Hotel New York", rent: 80, paymentStatus: "Unpaid" }, { id: 4, room: "Hotel Shalimar Motijheel", rent: 80, paymentStatus: "Unpaid" }, { id: 5, room: "Hampton Inn Times Square", rent: 750, paymentStatus: "Unpaid" }, ]; const packageBookings = [ { id: 1, package: "Fascinating Northeast Tour", cost: 200, paymentStatus: "Unpaid" }, { id: 2, package: "Grand Bargain Tour Offers", cost: 80, paymentStatus: "Unpaid" }, { id: 3, package: "Orlando - Ala Carte", cost: 180, paymentStatus: "Unpaid" }, { id: 4, package: "USA - Western Wonder", cost: 120, paymentStatus: "Unpaid" }, ]; 
      const [action, setAction] = useState(null); const handleSelect = (bookingId, type) => { setAction(`Selected action for ${type} Booking ID: ${bookingId}`); alert(`Action triggered for ${type} Booking ID: ${bookingId}`); }; 
       const properties = [ { id: 1, propertyName: "Property A", about: "Description A", available: true, photos: ['img1'] }, { id: 2, propertyName: "Property B", about: "Description B", available: false, photos: ['img2'] }, { id: 3, propertyName: "Property C", about: "Description C", available: true, photos: ['img1'] }, ]; const checkInsData = [ { name: "Room 101", checkInTime: 10 }, { name: "Room 102", checkInTime: 10.5 }, ]; const checkOutsData = [ { name: "Room 101", checkOutTime: 9 }, { name: "Room 102", checkOutTime: 9.5 }, ]; const totalProperties = properties.length; const availableProperties = properties.filter((property) => property.available).length; const COLORS = ["#0088FE", "#00C49F"];
        return (
          
          <Box sx={{ display: "flex" }}> <Sidebar open={sidebarOpen} handleDrawerToggle={handleDrawerToggle} />
           <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}> 
            <Header handleDrawerToggle={handleDrawerToggle} /> 
            <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#2D3847", mt: 8 }}> 
              <Typography variant="h4" gutterBottom sx={{color:"whitesmoke"}}> Dashboard </Typography> <Grid container spacing={3}> {
              /* Total Properties & Available Properties */}
               <Grid item xs={12} sm={6} md={6}> <Paper sx={{ padding: 2, background: "linear-gradient(to right, #32CD32)", cursor: "pointer" }} onClick={() => handleCardClick("Properties Info", properties)} > <Typography variant="h6">Properties Overview</Typography> <Typography sx={{ mt: 2 }}> Total Properties: <strong>{totalProperties}</strong> </Typography> <Typography> Available Properties: <strong>{availableProperties}</strong> </Typography> <ResponsiveContainer width="100%" height={300}> <PieChart> <Pie data={[ { name: "Total Properties", value: totalProperties }, { name: "Available Properties", value: availableProperties }, ]} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" > {COLORS.map((color, index) => ( <Cell key={`cell-${index}`} fill={color} /> ))} </Pie> <RechartTooltip /> </PieChart> </ResponsiveContainer> </Paper> </Grid> {/* Daily Check-ins */} <Grid item xs={12} sm={6} md={4}> <Paper sx={{ padding: 2, background: "linear-gradient(to right, #32CD32)", cursor: "pointer" }} onClick={() => handleCardClick("Daily Check-ins", checkInsData)} > <Typography variant="h6">Daily Check-ins</Typography> <Typography sx={{ mt: 2 }}> Total Check-ins Today: <strong>{checkInsData.length}</strong> </Typography> <ResponsiveContainer width="100%" height={300}> <BarChart data={checkInsData}> <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="name" /> <YAxis /> <RechartTooltip /> <Legend /> <Bar dataKey="checkInTime" fill="#0088FE" /> </BarChart> </ResponsiveContainer> </Paper> </Grid> {/* Daily Check-outs */} <Grid item xs={12} sm={6} md={4}> <Paper sx={{ padding: 2, background: "linear-gradient(to right, #32CD32)", cursor: "pointer" }} onClick={() => handleCardClick("Daily Check-outs", checkOutsData)} > <Typography variant="h6">Daily Check-outs</Typography> <Typography sx={{ mt: 2 }}> Total Check-outs Today: <strong>{checkOutsData.length}</strong> </Typography> <ResponsiveContainer width="100%" height={300}> <BarChart data={checkOutsData}> <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="name" /> <YAxis /> <RechartTooltip /> <Legend /> <Bar dataKey="checkOutTime" fill="#00C49F" /> </BarChart> </ResponsiveContainer> </Paper> </Grid> </Grid> {/* Featured Properties */} <Typography variant="h5" sx={{ mt: 4, mb: 2 }}> Featured Properties </Typography> <Grid container spacing={3}> {properties.map((property) => ( <Grid item xs={12} sm={6} md={4} key={property.id}> <Card> <CardMedia component="img" height="140" image={property.photos[0]} alt={property.propertyName} /> <CardContent> <Typography gutterBottom variant="h6" component="div"> {property.propertyName} </Typography> <Typography variant="body2" color="text.secondary"> {property.about} </Typography> </CardContent> </Card> </Grid> ))} </Grid> </Box>

      {/* Modal for detailed information */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 1,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6">{modalTitle}</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {modalEntries.map((entry, index) => (
                <Grid item xs={12} key={index}>
                  <Paper sx={{ padding: 2 }}>
                    <Typography variant="body1">{entry.name || entry.propertyName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {entry.details || entry.about || ""}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
  
        </Fade>
      </Modal>
      </Box>
      </Box>
   
  
   
  );
};

export default Dashboard;

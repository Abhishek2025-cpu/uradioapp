// import React, { useState } from 'react';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   Avatar,
//   Divider,
//   Collapse,
//   IconButton,
//   Tooltip,
//   Typography,
//   Box,
//   TextField
// } from '@mui/material';
// import {
//   CircleOutlined as CircleOutlinedIcon,
//   Menu,
//   ExitToApp,
//   Dashboard,
//   Hotel,
//   CalendarToday,
//   Payment,
//   ExpandLess,
//   ExpandMore
// } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';
// import logo from '../assests/applogo.png'; // Replace with your logo path

// const drawerWidthOpen = 240;
// const drawerWidthClosed = 60;

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const MenuText = styled(Typography)(({ theme }) => ({
//   fontSize: '0.8rem',
//   whiteSpace: 'nowrap',
//   color: '#FFFFFF',
// }));

// const Sidebar = ({ open, handleDrawerToggle }) => {
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [roomsOpen, setRoomsOpen] = useState(false);
//   const [bookingsOpen, setBookingsOpen] = useState(false);
//   const [paymentsOpen, setPaymentsOpen] = useState(false);

//   const handleToggle = (setter) => setter((prev) => !prev);

//   return (
//     <Drawer
//       variant="permanent"
//       anchor="left"
//       sx={{
//         width: open ? drawerWidthOpen : drawerWidthClosed,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: open ? drawerWidthOpen : drawerWidthClosed,
//           transition: 'width 0.3s',
//           overflowX: 'hidden',
//           backgroundColor: '#2D3847', // Menu background color
//           color: '#FFFFFF',
//         },
//       }}
//     >
//       <DrawerHeader>
//         {open && (
//           <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
//             <img
//               src={logo}
//               alt="App Logo"
//               style={{
//                 width: 40,
//                 height: 40,
//                 marginRight: 10,
//                 borderRadius: '50%',
//                 marginLeft: 5,
//               }}
//             />
//           </Typography>
//         )}
//         <IconButton onClick={handleDrawerToggle} sx={{ color: '#FFFFFF' }}>
//           <Menu />
//         </IconButton>
//       </DrawerHeader>
//       <Divider sx={{ borderColor: '#FFFFFF' }} />
//       {/* Scrollable Menu Container */}
//       <Box
//         sx={{
//           overflowY: 'auto', // Enables scrolling
//           height: 'calc(100vh - 64px)', // Full height minus header
//           backgroundColor: '#2D3847',
//           scrollbarWidth: 'thin', // For modern browsers
//           '&::-webkit-scrollbar': {
//             width: '8px', // Scrollbar width
//           },
//           '&::-webkit-scrollbar-thumb': {
//             backgroundColor: '#555', // Scrollbar thumb color
//             borderRadius: '4px',
//           },
//           '&::-webkit-scrollbar-thumb:hover': {
//             backgroundColor: '#999', // Thumb hover color
//           },
//         }}
//       >
//         <List>
//           {/* Profile Section */}
//           <Tooltip title="Abhi" placement="right">
//             <ListItem button onClick={() => handleToggle(setProfileOpen)}>
//               <ListItemIcon>
//                 <Avatar
//                   alt="Abhi"
//                   src="/static/images/avatar/1.jpg" // Replace with your avatar path
//                   sx={{ marginLeft: '-7px' }}
//                 />
//               </ListItemIcon>
//               {open && <MenuText>Abhishek</MenuText>}
//               {open &&
//                 (profileOpen ? (
//                   <ExpandLess sx={{ color: '#FFFFFF' }} />
//                 ) : (
//                   <ExpandMore sx={{ color: '#FFFFFF' }} />
//                 ))}
//             </ListItem>
//           </Tooltip>
//           <Collapse in={profileOpen && open} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem button>
//                 <MenuText>Edit Profile</MenuText>
//               </ListItem>
//               <ListItem button>
//                 <MenuText>Change Password</MenuText>
//               </ListItem>
//               <ListItem button>
//                 <MenuText>Logout</MenuText>
//                 <ListItemIcon>
//                   <ExitToApp sx={{ color: '#FFFFFF' }} />
//                 </ListItemIcon>
//               </ListItem>
//             </List>
//           </Collapse>
//           <Divider sx={{ borderColor: '#FFFFFF' }} />
//           {/* Search Box */}
//           {open && (
//             <>
//               <ListItem>
//                 <TextField
//                   variant="outlined"
//                   placeholder="Search..."
//                   fullWidth
//                   size="small"
//                   InputProps={{
//                     style: { color: '#FFFFFF' },
//                   }}
//                 />
//               </ListItem>
//               <Divider sx={{ borderColor: '#FFFFFF' }} />
//             </>
//           )}
//           {/* Dashboard */}
//           <Tooltip title="Dashboard" placement="right">
//             <ListItem button>
//               <ListItemIcon>
//                 <Dashboard sx={{ color: '#FFFFFF' }} />
//               </ListItemIcon>
//               {open && <MenuText>Dashboard</MenuText>}
//             </ListItem>
//           </Tooltip>
//           {/* Hotel */}
//           <Tooltip title="Hotel" placement="right">
//             <ListItem button onClick={() => handleToggle(setRoomsOpen)}>
//               <ListItemIcon>
//                 <Hotel sx={{ color: '#FFFFFF' }} />
//               </ListItemIcon>
//               {open && <MenuText>Hotel</MenuText>}
//               {open &&
//                 (roomsOpen ? (
//                   <ExpandLess sx={{ color: '#FFFFFF' }} />
//                 ) : (
//                   <ExpandMore sx={{ color: '#FFFFFF' }} />
//                 ))}
//             </ListItem>
//           </Tooltip>
//           <Collapse in={roomsOpen && open} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem button>
//                 <ListItemIcon>
//                   <CircleOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
//                 </ListItemIcon>
//                 <MenuText>Rooms</MenuText>
//               </ListItem>
//               <ListItem button>
//                 <ListItemIcon>
//                   <CircleOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
//                 </ListItemIcon>
//                 <MenuText>Room Categories</MenuText>
//               </ListItem>
//             </List>
//           </Collapse>
//           {/* Bookings */}
//           <Tooltip title="Bookings" placement="right">
//             <ListItem button onClick={() => handleToggle(setBookingsOpen)}>
//               <ListItemIcon>
//                 <CalendarToday sx={{ color: '#FFFFFF' }} />
//               </ListItemIcon>
//               {open && <MenuText>Bookings</MenuText>}
//               {open &&
//                 (bookingsOpen ? (
//                   <ExpandLess sx={{ color: '#FFFFFF' }} />
//                 ) : (
//                   <ExpandMore sx={{ color: '#FFFFFF' }} />
//                 ))}
//             </ListItem>
//           </Tooltip>
//           <Collapse in={bookingsOpen && open} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem button>
//                 <ListItemIcon>
//                   <CircleOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
//                 </ListItemIcon>
//                 <MenuText>Booking Report</MenuText>
//               </ListItem>
//               <ListItem button>
//                 <ListItemIcon>
//                   <CircleOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
//                 </ListItemIcon>
//                 <MenuText>Booking Calendars</MenuText>
//               </ListItem>
//               <ListItem button>
//                 <ListItemIcon>
//                   <CircleOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
//                 </ListItemIcon>
//                 <MenuText>Bookings</MenuText>
//               </ListItem>
//               <ListItem button>
//                 <ListItemIcon>
//                   <CircleOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
//                 </ListItemIcon>
//                 <MenuText>Invoices</MenuText>
//               </ListItem>
//             </List>
//           </Collapse>
//           {/* Payments */}
//           <Tooltip title="Payments" placement="right">
//             <ListItem button onClick={() => handleToggle(setPaymentsOpen)}>
//               <ListItemIcon>
//                 <Payment sx={{ color: '#FFFFFF' }} />
//               </ListItemIcon>
//               {open && <MenuText>Payments</MenuText>}
//               {open &&
//                 (paymentsOpen ? (
//                   <ExpandLess sx={{ color: '#FFFFFF' }} />
//                 ) : (
//                   <ExpandMore sx={{ color: '#FFFFFF' }} />
//                 ))}
//             </ListItem>
//           </Tooltip>
//           <Collapse in={paymentsOpen && open} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem button>
//                 <ListItemIcon>
//                   <CircleOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
//                 </ListItemIcon>
//                 <MenuText>Transactions</MenuText>
//               </ListItem>
//               <ListItem button>
//                 <ListItemIcon>
//                   <CircleOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
//                 </ListItemIcon>
//                 <MenuText>Payment Logs</MenuText>
//               </ListItem>
//               <ListItem button>
//                 <ListItemIcon>
//                   <CircleOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
//                 </ListItemIcon>
//                 <MenuText>Payment Methods</MenuText>
//               </ListItem>

//             </List>
//           </Collapse>
//         </List>
//       </Box>
//     </Drawer>
//   );
// };

// export default Sidebar;






import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  Divider,
  Collapse,
  IconButton,
  Tooltip,
  Typography,

  TextField
} from '@mui/material';
import {
  CircleOutlined as CircleOutlinedIcon,
  Menu,
  ExitToApp,
  Dashboard,

  CalendarToday,
  Payment,
  ExpandLess,
  ExpandMore,


} from '@mui/icons-material';
import BusinessIcon from '@mui/icons-material/Business';

import { styled } from '@mui/material/styles';
import logo from '../assests/applogo.png'; // Replace with your logo path
import RoomCategories from './RoomCategories';


const drawerWidthOpen = 240;
const drawerWidthClosed = 60;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const MenuText = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  whiteSpace: 'nowrap',
  color: '#FFFFFF',
}));

const Sidebar = ({ open, handleDrawerToggle }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [bookingsOpen, setBookingsOpen] = useState(false);
  const [paymentsOpen, setPaymentsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = (setter) => setter((prev) => !prev);
  const handleClick = () => {
    navigate('/AllPropertiesInteractive');
  };
  const handlebooking = () => {
    navigate('/booking');
  };
  const handleRoomCategories = () => {
    navigate('/RoomCategories');
  };
  const handleBookingCalendar = () => {
    navigate('/BookingCalendar');
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: open ? drawerWidthOpen : drawerWidthClosed,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidthOpen : drawerWidthClosed,
          transition: 'width 0.3s',
          overflowX: 'hidden',
          overflowY: 'auto', // Enable vertical scrolling
          backgroundColor: '#2D3847', // Menu background color
          color: '#FFFFFF',
        },
      }}
    >
      <DrawerHeader>
        {open && (
          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
            <img
              src={logo}
              alt="App Logo"
              style={{
                width: 40,
                height: 40,
                marginRight: 10,
                borderRadius: '50%',
                marginLeft: 5,
              }}
            />
          </Typography>
        )}
        <IconButton onClick={handleDrawerToggle} sx={{ color: '#FFFFFF' }}>
          <Menu />
        </IconButton>
      </DrawerHeader>
      <Divider sx={{ borderColor: '#FFFFFF' }} />
      {/* Scrollable Menu Container */}
      <List>
        {/* Profile Section */}
        <Tooltip title="Abhi" placement="right">
          <ListItem button onClick={() => handleToggle(setProfileOpen)}>
            <ListItemIcon>
              <Avatar
                alt="Abhi"
                src="/static/images/avatar/1.jpg" // Replace with your avatar path
                sx={{ marginLeft: '-7px' }}
              />
            </ListItemIcon>
            {open && <MenuText>Abhishek</MenuText>}
            {open &&
              (profileOpen ? (
                <ExpandLess sx={{ color: '#FFFFFF' }} />
              ) : (
                <ExpandMore sx={{ color: '#FFFFFF' }} />
              ))}
          </ListItem>
        </Tooltip>
        <Collapse in={profileOpen && open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button>
              <MenuText>Edit Profile</MenuText>
            </ListItem>
            <ListItem button>
              <MenuText>Change Password</MenuText>
            </ListItem>
            <ListItem button>
              <MenuText>Logout</MenuText>
              <ListItemIcon>
                <ExitToApp sx={{ color: '#FFFFFF' }} />
              </ListItemIcon>
            </ListItem>
          </List>
        </Collapse>
        <Divider sx={{ borderColor: '#FFFFFF' }} />
        {/* Search Box */}
        {open && (
          <>
            <ListItem>
              <TextField
                variant="outlined"
                placeholder="Search..."
                fullWidth
                size="small"
                InputProps={{
                  style: { color: '#FFFFFF' },
                }}
              />
            </ListItem>
            <Divider sx={{ borderColor: '#FFFFFF' }} />
          </>
        )}
        {/* Dashboard */}
        <Tooltip title="Dashboard" placement="right">
          <ListItem button>
            <ListItemIcon>
              <Dashboard sx={{ color: '#FFFFFF' }} />
            </ListItemIcon>
            {open && <MenuText>Dashboard</MenuText>}
          </ListItem>
        </Tooltip>
        {/* Property */}
        <Tooltip title="Properties" placement="right">
          <ListItem button onClick={() => handleToggle(setRoomsOpen)}>
            <ListItemIcon>
              <BusinessIcon sx={{ color: '#FFFFFF' }} />
            </ListItemIcon>
            {open && <MenuText>Properties</MenuText>}
            {open &&
              (roomsOpen ? (
                <ExpandLess sx={{ color: '#FFFFFF' }} />
              ) : (
                <ExpandMore sx={{ color: '#FFFFFF' }} />
              ))}
          </ListItem>
        </Tooltip>
        <Collapse in={roomsOpen && open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <CircleOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
              </ListItemIcon>
              <MenuText>All Properties</MenuText>
            </ListItem>
            <ListItem button onClick={handleRoomCategories}>
              <ListItemIcon>
                <CircleOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
              </ListItemIcon>
              <MenuText>Room Categories</MenuText>
            </ListItem>
          </List>
        </Collapse>
        {/* Bookings */}
        <Tooltip title="Bookings" placement="right">
          <ListItem button onClick={() => handleToggle(setBookingsOpen)}>
            <ListItemIcon>
              <CalendarToday sx={{ color: '#FFFFFF' }} />
            </ListItemIcon>
            {open && <MenuText>Bookings</MenuText>}
            {open &&
              (bookingsOpen ? (
                <ExpandLess sx={{ color: '#FFFFFF' }} />
              ) : (
                <ExpandMore sx={{ color: '#FFFFFF' }} />
              ))}
          </ListItem>
        </Tooltip>
        <Collapse in={bookingsOpen && open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemIcon>
                <CircleOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
              </ListItemIcon>
              <MenuText>Booking Report</MenuText>
            </ListItem>
            <ListItem button onClick={handleBookingCalendar}>
              <ListItemIcon>
                <CircleOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
              </ListItemIcon>
              <MenuText>Booking Calendar</MenuText>
            </ListItem>
            <ListItem button onClick={handlebooking}>
              <ListItemIcon>
                <CircleOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
              </ListItemIcon>
              <MenuText>Bookings</MenuText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <CircleOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
              </ListItemIcon>
              <MenuText>Invoice</MenuText>
            </ListItem>
          </List>
        </Collapse>
        {/* Payments */}
        <Tooltip title="Payments" placement="right">
          <ListItem button onClick={() => handleToggle(setPaymentsOpen)}>
            <ListItemIcon>
              <Payment sx={{ color: '#FFFFFF' }} />
            </ListItemIcon>
            {open && <MenuText>Payments</MenuText>}
            {open &&
              (paymentsOpen ? (
                <ExpandLess sx={{ color: '#FFFFFF' }} />
              ) : (
                <ExpandMore sx={{ color: '#FFFFFF' }} />
              ))}
          </ListItem>
        </Tooltip>
        <Collapse in={paymentsOpen && open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemIcon>
                <CircleOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
              </ListItemIcon>
              <MenuText>Transactions</MenuText>
            </ListItem>
            
            <ListItem button>
              <ListItemIcon>
                <CircleOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
              </ListItemIcon>
              <MenuText>Payment Logs</MenuText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <CircleOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
              </ListItemIcon>
              <MenuText>Payment Method</MenuText>
            </ListItem>
         
            
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;


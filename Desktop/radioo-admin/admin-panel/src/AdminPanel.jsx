import React, { useState } from "react";
import { Box, CssBaseline, Typography, IconButton, AppBar, Toolbar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Badge, Avatar, Divider, MenuItem, Menu, Tooltip } from "@mui/material";
import { Dashboard, Person, DirectionsBike, History, Notifications, Menu as MenuIcon, Logout } from "@mui/icons-material";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sidebar menu items
const menuItems = [
  { text: "Dashboard", icon: <Dashboard /> },
  { text: "Users", icon: <Person /> },
  { text: "Drivers", icon: <DirectionsBike /> },
  { text: "Ride History", icon: <History /> },
];

// Sample data for charts
const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

// Sample data for pie chart
const pieData = [
  { name: 'Active Users', value: 400 },
  { name: 'Inactive Users', value: 100 },
];

const COLORS = ['#0088FE', '#FF8042'];

export default function AdminPanel() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logged out");
    handleMenuClose();
  };

  const drawerWidth = 240;
  const collapsedWidth = 60; // Width for collapsed sidebar

  // Sidebar
  const drawer = (
    <Box sx={{ bgcolor: "primary.main", height: "100%", color: "white" }}>
      <Typography variant="h5" align="center" sx={{ my: 2, fontWeight: "bold", display: sidebarOpen ? 'block' : 'none' }}>
        Admin Panel
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Avatar alt="User Profile" src="/path/to/profile-pic.jpg" />
      </Box>
      <List>
        {menuItems.map((item) => (
          <Tooltip key={item.text} title={item.text} placement="right">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ display: sidebarOpen ? 'block' : 'none' }} />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
        <Divider sx={{ bgcolor: 'white' }} />
        <Tooltip title="Logout" placement="right">
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ color: "white" }}><Logout /></ListItemIcon>
              <ListItemText primary="Logout" sx={{ display: sidebarOpen ? 'block' : 'none' }} />
            </ListItemButton>
          </ListItem>
        </Tooltip>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", overflowX: 'hidden' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "primary.main",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleSidebarToggle}
            sx={{ mr: 2 }}
            className="menu-bar"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <Avatar alt="Profile" src="/path/to/logo.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            width: sidebarOpen ? drawerWidth : collapsedWidth,
            boxSizing: "border-box",
            zIndex: (theme) => theme.zIndex.appBar + 1,
            transition: "width 0.3s",
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { sm: `${sidebarOpen ? drawerWidth : collapsedWidth}px` },
          mt: 8,
          bgcolor: "#f5f5f5",
          minHeight: "100vh",
          transition: "margin-left 0.3s",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to the Admin Panel of Raidoo
        </Typography>
        <Typography variant="body1">
          Select a section from the sidebar to get started.
        </Typography>

        {/* Charts */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>Bar Chart</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Line Chart</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Active vs Inactive Users</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
}

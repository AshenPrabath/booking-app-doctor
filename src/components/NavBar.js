import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const logoutUser = useStoreActions((actions) => actions.logoutUser); // Action to handle logout
  
  const handleLogout = () => {
    // Clear the session or token here
    logoutUser();  // Assuming you have an action for logging out
    
    // Redirect to the login page
    navigate('/');
  };
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Pet Palace
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button component={Link} to="/appointments" onClick={toggleDrawer(false)}>
            <ListItemText primary="Appointments" />
          </ListItem>
          <ListItem button component={Link} to="/completed-appointments" onClick={toggleDrawer(false)}>
            <ListItemText primary="Completed Appointments" />
          </ListItem>
          <ListItem button component={Link} to="/confirmed-appointments" onClick={toggleDrawer(false)}>
            <ListItemText primary="Confirmed Appointments" />
          </ListItem>
          {/* Logout Button */}
          <ListItem button  onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        
        </List>
      </Drawer>
      
    </>
  );
};

export default NavBar;

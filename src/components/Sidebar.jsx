import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Toolbar, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PaymentIcon from '@mui/icons-material/Payment';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  return (
    <Drawer
      variant="permanent"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingLeft: '0px',
          fontFamily: 'Poppins, sans-serif',
        },
      }}
    >
      <Box>
        <Toolbar />
        <Divider />
        <List>
          <ListItem
            button
            component={Link}
            to="/etudiant"
            sx={{
              paddingY: 2,
              paddingLeft: '0px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ fontSize: '1.5rem', marginLeft: '25px' }}> {/* Ajoutez marginLeft: 'auto' */}
              <AccountBoxIcon fontSize="inherit" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '1rem' }} primary="Étudiant" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/montant"
            sx={{
              paddingY: 2,
              paddingLeft: '0px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ fontSize: '1.5rem', marginLeft: '25px' }}> {/* Ajoutez marginLeft: 'auto' */}
              <MonetizationOnIcon fontSize="inherit" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '1rem' }} primary="Montant" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/paiement"
            sx={{
              paddingY: 2,
              paddingLeft: '0px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ fontSize: '1.5rem', marginLeft: '25px' }}> {/* Ajoutez marginLeft: 'auto' */}
              <PaymentIcon fontSize="inherit" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '1rem' }} primary="Paiement" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

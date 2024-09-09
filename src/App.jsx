import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Box, Toolbar } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Etudiant from './pages/Etudiant/Etudiant';
import Montant from './pages/Montant/Montant';
import Paiement from './pages/Paiement/Paiement';
import './index.css'; // Importer le fichier global.css

const drawerWidth = 240;

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header handleDrawerToggle={handleDrawerToggle} />
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, marginLeft: { sm: `${drawerWidth}px` } }}
        >
          <Toolbar />
          <Routes>
            <Route path="/etudiant" element={<Etudiant />} />
            <Route path="/montant" element={<Montant />} />
            <Route path="/paiement" element={<Paiement />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;

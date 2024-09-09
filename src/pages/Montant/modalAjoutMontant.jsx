import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, Grid } from '@mui/material';
import { addMontant } from '../Montant/Services/MontantService';

const ModalAjoutMontant = ({ open, onClose, onAddSuccess }) => {
  const [niveau, setNiveau] = useState('');
  const [montant, setMontant] = useState('');

  const handleAdd = async () => {
    try {
      const newMontant = {
        niveau: niveau,
        montant: montant
      };
      await addMontant(newMontant);
      onAddSuccess();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du montant:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>

      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400, maxWidth: '95%', borderRadius: '10px', fontFamily: 'Poppins' }}>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: 'Poppins' }}>
          AJOUTER UN MONTANT
        </Typography>

        <TextField fullWidth label="Niveau" value={niveau} onChange={(e) => setNiveau(e.target.value)} style={{ marginBottom: '15px', fontFamily: 'Poppins' }}/>

        <TextField fullWidth label="Montant" type="number" value={montant} onChange={(e) => setMontant(e.target.value)} style={{ marginBottom: '15px', fontFamily: 'Poppins' }}/>

        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleAdd} style={{ fontFamily: 'Poppins' }}>
              AJOUTER
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={onClose} sx={{ fontFamily: 'Poppins' }}>
              ANNULER
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalAjoutMontant;

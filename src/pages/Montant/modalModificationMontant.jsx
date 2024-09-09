import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, Grid } from '@mui/material';
import { updateMontant } from '../Montant/Services/MontantService';

const ModalModificationMontant = ({ montant, onClose, onSave }) => {
  const [niveau, setNiveau] = useState('');
  const [montantValue, setMontantValue] = useState('');

  useEffect(() => {
    if (montant) {
      setNiveau(montant.niveau);
      setMontantValue(montant.montant.toString());
    }
  }, [montant]);

  const handleSave = async () => {
    try {
      const updatedMontant = {...montant, niveau, montant: parseInt(montantValue) };
      await updateMontant(updatedMontant.idniv, updatedMontant);
      onSave(updatedMontant);
    } catch (error) {
      console.error('Erreur lors de la modification du montant:', error);
    }
  };

  return (
    <Modal open={!!montant} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400, maxWidth: '95%', borderRadius: '10px', fontFamily: 'Poppins' }}>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: 'Poppins' }}>
          MODIFIER UN MONTANT
        </Typography>

            <TextField fullWidth label="IDNIV" value={montant.idniv} disabled style={{ marginBottom: '15px', fontFamily: 'Poppins' }} />

            <TextField fullWidth label="Niveau" value={niveau} onChange={(e) => setNiveau(e.target.value)} style={{ marginBottom: '15px', fontFamily: 'Poppins' }} />

            <TextField fullWidth label="Montant" type="number" value={montantValue} onChange={(e) => setMontantValue(e.target.value)} style={{ marginBottom: '15px', fontFamily: 'Poppins' }} />

        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSave} style={{ fontFamily: 'Poppins' }}>
              MODIFIER
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

export default ModalModificationMontant;

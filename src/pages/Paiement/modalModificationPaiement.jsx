import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, Grid } from '@mui/material';
import { updatePaiement } from '../Paiement/Services/PaiementService';

const ModalModificationPaiement = ({ paiement, onClose, onSave }) => {
  const [anneeUniv, setAnneeUniv] = useState('');
  const [date, setDate] = useState('');
  const [nbrMois, setNbrMois] = useState('');

  useEffect(() => {
    if (paiement) {
      setAnneeUniv(paiement.annee_univ);
      setDate(paiement.date);
      setNbrMois(paiement.nbrMois);
    }
  }, [paiement]);

  const handleSave = async () => {
    try {
      const updatedPaiement = { ...paiement, annee_univ: anneeUniv, date: date, nbrMois: nbrMois };
      await updatePaiement(updatedPaiement.idpaye, updatedPaiement);
      onSave(updatedPaiement);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la modification du paiement:', error);
    }
  };

  return (
    <Modal open={!!paiement} onClose={onClose}>

      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400, maxWidth: '95%', borderRadius: '10px', fontFamily: 'Poppins' }}>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: 'Poppins' }}>
          MODIFIER UN PAIEMENT
        </Typography>

        <TextField fullWidth label="ID Paiement" value={paiement.idpaye} disabled style={{ marginBottom: '15px', fontFamily: 'Poppins' }} />

        <TextField fullWidth label="Matricule" value={paiement.etudiant.matricule} disabled style={{ marginBottom: '15px', fontFamily: 'Poppins' }} />

        <TextField fullWidth label="Année Universitaire" value={anneeUniv} onChange={(e) => setAnneeUniv(e.target.value)} style={{ marginBottom: '15px', fontFamily: 'Poppins' }} />

        <TextField fullWidth type="date" label="Date" InputLabelProps={{ shrink: true }} value={date} onChange={(e) => setDate(e.target.value)} style={{ marginBottom: '15px', fontFamily: 'Poppins' }} />

        <TextField fullWidth label="Nombre de Mois" type="number" value={nbrMois} onChange={(e) => setNbrMois(e.target.value)} style={{ marginBottom: '15px', fontFamily: 'Poppins' }} />

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

export default ModalModificationPaiement;

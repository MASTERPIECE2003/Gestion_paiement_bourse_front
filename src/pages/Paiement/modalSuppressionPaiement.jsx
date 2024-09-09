import React from 'react';
import { Modal, Box, Typography, Button, Grid } from '@mui/material';
import { deletePayer } from '../Paiement/Services/PaiementService';

const ModalSuppressionPaiement = ({ open, onClose, onDelete, paiement }) => {
  const handleDelete = () => {
    onDelete(paiement.idpaye);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400, maxWidth: '95%', borderRadius: '10px', fontFamily: 'Poppins' }}>

        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: 'Poppins' }}>
          SUPPRIMER UN PAIEMENT
        </Typography>

        <Typography sx={{ marginBottom: '15px', fontFamily: 'Poppins' }}>
          Êtes-vous sûr de vouloir supprimer ce paiement ?
        </Typography>

        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={handleDelete} sx={{ fontFamily: 'Poppins' }}>
              SUPPRIMER
            </Button>
          </Grid>

          <Grid item>
            <Button variant="contained" onClick={onClose} sx={{ fontFamily: 'Poppins' }}>
              ANNULER
            </Button>
          </Grid>

        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalSuppressionPaiement;

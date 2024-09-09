import React from 'react';
import { Modal, Box, Typography, Button, Grid } from '@mui/material';
import { deleteMontant } from '../Montant/Services/MontantService';

const ModalSuppressionMontant = ({ open, onClose, onDelete, montant }) => {
  const handleDelete = async () => {
    try {
      await deleteMontant(montant.idniv);
      onDelete(montant.idniv);
    } catch (error) {
      console.error('Erreur lors de la suppression du montant:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-suppression-montant" aria-describedby="modal-to-rising" BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }}}>

      <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400, borderRadius: '10px', outline: 'none', fontFamily: 'Poppins' }}>

        <Typography variant="h6" gutterBottom align="center" sx={{ fontFamily: 'Poppins' }}>
          CONFIRMER LA SUPPRESSION DU MONTANT
        </Typography>
        {montant && (

          <Typography variant="body1" gutterBottom align="center" sx={{ fontFamily: 'Poppins' }}>
            Êtes-vous sûr de vouloir supprimer le montant pour le niveau {montant.niveau} ?
          </Typography>
        )}
          <Grid container justifyContent="center" spacing={2} sx={{ marginTop: '15px', fontFamily: 'Poppins' }}>
                  <Grid item>
                    <Button variant="contained" color="error" onClick={handleDelete} sx={{ fontFamily: 'Poppins' }}>
                      SUPPRIMER
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

export default ModalSuppressionMontant;

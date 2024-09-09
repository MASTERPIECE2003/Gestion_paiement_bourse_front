import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ModalSuppressionEtudiant = ({ open, onClose, onDelete, etudiant }) => {
  const handleDelete = () => {
    onDelete(etudiant.matricule);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-suppression-etudiant" aria-describedby="modal-to-delete-student">

      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '10px' }}>

        <Typography variant="h6" component="h2" gutterBottom align="center">
          CONFIRMER LA SUPPRESSION DE L'ÉTUDIANT
        </Typography>
        <Typography variant="body1" gutterBottom align="center">
          Êtes-vous sûr de vouloir supprimer l'étudiant {etudiant.nom} ?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ mr: 2 }}>
            SUPPRIMER
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            ANNULER
          </Button>
        </Box>

      </Box>

    </Modal>
  );
};

export default ModalSuppressionEtudiant;

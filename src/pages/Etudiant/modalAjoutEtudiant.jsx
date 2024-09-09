import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { addEtudiant } from '../Etudiant/services/EtudiantService';

const ModalAjoutEtudiant = ({ onClose, onAddSuccess }) => {
  const [newEtudiant, setNewEtudiant] = useState({
    nom: '',
    sexe: '',
    datenais: '',
    institution: '',
    niveau: '',
    mail: '',
    annee_univ: '', });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEtudiant(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await addEtudiant(newEtudiant);
      onAddSuccess(newEtudiant); //Ajout reussi
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'étudiant:', error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose} aria-labelledby="modal-ajout-etudiant" aria-describedby="modal-to-add-student">

      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '10px' }}>
        <Typography variant="h6" component="h2" gutterBottom>
          AJOUTER UN ÉTUDIANT
        </Typography>

        <form onSubmit={handleSave}>
          <TextField fullWidth label="NOM" name="nom" value={newEtudiant.nom} onChange={handleChange} margin="normal" variant="outlined" required sx={{ fontFamily: '"Poppins", sans-serif' }}/>

          <TextField fullWidth label="SEXE" name="sexe" value={newEtudiant.sexe} onChange={handleChange} margin="normal" variant="outlined" required sx={{ fontFamily: '"Poppins", sans-serif' }}/>

          <TextField fullWidth label="DATE DE NAISSANCE" name="datenais" type="date" value={newEtudiant.datenais} onChange={handleChange} margin="normal" variant="outlined" required sx={{ fontFamily: '"Poppins", sans-serif' }}/>

          <TextField fullWidth label="INSTITUTION" name="institution" value={newEtudiant.institution} onChange={handleChange} margin="normal" variant="outlined" required sx={{ fontFamily: '"Poppins", sans-serif' }}/>

          <TextField fullWidth label="NIVEAU" name="niveau" value={newEtudiant.niveau} onChange={handleChange} margin="normal" variant="outlined" required sx={{ fontFamily: '"Poppins", sans-serif' }}/>

          <TextField fullWidth label="EMAIL" name="mail" value={newEtudiant.mail} onChange={handleChange} margin="normal" variant="outlined" required sx={{ fontFamily: '"Poppins", sans-serif' }} />

          <TextField fullWidth label="ANNÉE UNIVERSITAIRE" name="annee_univ" value={newEtudiant.annee_univ} onChange={handleChange} margin="normal" variant="outlined" required sx={{ fontFamily: '"Poppins", sans-serif' }}/>

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
            AJOUTER
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancel} sx={{ mt: 2 }}>
            ANNULER
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalAjoutEtudiant;

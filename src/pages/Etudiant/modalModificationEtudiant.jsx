import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const URL = 'http://localhost:8082';

const ModalModificationEtudiant = ({ etudiant, onSave, onClose }) => {
  const [editedEtudiant, setEditedEtudiant] = useState({ ...etudiant });

  useEffect(() => {
    const formattedDate = isValidDate(etudiant.datenais) ? new Date(etudiant.datenais).toISOString().split('T')[0] : '';
    setEditedEtudiant({ ...etudiant, datenais: formattedDate });
  }, [etudiant]);

  const isValidDate = (date) => {
    return !isNaN(Date.parse(date));
  };

const handleChange = (e) => {
  const { name, value } = e.target;
  setEditedEtudiant(prevState => ({
    ...prevState,
    [name]: name === 'datenais' ? new Date(value).toISOString().split('T')[0] : value,
  }));
};

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${URL}/etudiants/${editedEtudiant.matricule}`, editedEtudiant);
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error('Erreurs de la modification de l\'étudiant:', error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal open={true} onClose={onClose} aria-labelledby="modal-modification-etudiant" aria-describedby="modal-to-modify-student">

      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '10px' }}>
        <Typography variant="h6" component="h2" gutterBottom>
          MODIFIER UN ETUDIANT
        </Typography>

        <form onSubmit={handleSave}>
          <TextField fullWidth label="MATRICULE" name="matricule" value={editedEtudiant.matricule} onChange={handleChange} margin="normal" variant="outlined" disabled/>

          <TextField fullWidth label="NOM" name="nom" value={editedEtudiant.nom} onChange={handleChange} margin="normal" variant="outlined"/>

          <TextField fullWidth label="SEXE" name="sexe" value={editedEtudiant.sexe} onChange={handleChange} margin="normal" variant="outlined"/>

          <TextField fullWidth label="DATE DE NAISSANCE" name="datenais" type="date" value={editedEtudiant.datenais} onChange={handleChange} margin="normal" variant="outlined"/>

          <TextField fullWidth label="INSTITUTION" name="institution" value={editedEtudiant.institution} onChange={handleChange} margin="normal" variant="outlined"/>

          <TextField fullWidth label="NIVEAU" name="niveau" value={editedEtudiant.niveau} onChange={handleChange} margin="normal" variant="outlined"/>

          <TextField fullWidth label="EMAIL" name="mail" value={editedEtudiant.mail} onChange={handleChange} margin="normal" variant="outlined" />

          <TextField fullWidth label="ANNEE UNIVERSITAIRE" name="annee_univ" value={editedEtudiant.annee_univ} onChange={handleChange} margin="normal" variant="outlined"/>

          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
                MODIFIER
              </Button>
              <Button variant="contained" color="secondary" onClick={handleCancel} sx={{ mt: 2 }}>
                ANNULER
              </Button>
            </Grid>
          </Grid>

        </form>

      </Box>
    </Modal>
  );
};

export default ModalModificationEtudiant;

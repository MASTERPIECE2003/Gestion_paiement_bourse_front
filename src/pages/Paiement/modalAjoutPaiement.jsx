import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, MenuItem, Grid } from '@mui/material';
import { addPaiement, getAllEtudiants } from '../Paiement/Services/PaiementService';

const ModalAjoutPaiement = ({ open, onClose, onAddSuccess }) => {
  const [matricule, setMatricule] = useState('');
  const [annee_univ, setAnneeUniv] = useState('');
  const [date, setDate] = useState('');
  const [nbrMois, setNbrMois] = useState('');
  const [etudiants, setEtudiants] = useState([]);

  useEffect(() => {
    fetchEtudiants();
  }, []);

  const fetchEtudiants = async () => {
    try {
      const data = await getAllEtudiants();
      setEtudiants(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants:', error);
    }
  };

  const handleAdd = async () => {
    if (!matricule || !annee_univ || !date || !nbrMois) {
      console.error('Veuillez remplir tous les champs');
      return;
    }

    const newPaiement = {
      etudiant: {
        matricule,
      },
      annee_univ,
      date,
      nbrMois: parseInt(nbrMois, 10),
    };

    try {
      await addPaiement(newPaiement);
      onAddSuccess();
    } catch (error) {
      if (error.response) {
        console.error('Erreur lors de l\'ajout du paiement:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        console.error('Erreur de requête:', error.request);
      } else {
        console.error('Erreur de la configuration de la requête:', error.message);
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400, maxWidth: '95%', borderRadius: '10px', fontFamily: 'Poppins',
        }}>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: 'Poppins' }}>
          AJOUTER UN PAIEMENT
        </Typography>

        <TextField select fullWidth label="Matricule" value={matricule} onChange={(e) => setMatricule(e.target.value)} style={{ marginBottom: '15px', fontFamily: 'Poppins' }}>
          {etudiants.map((etudiant) => (
            <MenuItem key={etudiant.matricule} value={etudiant.matricule}>
              {etudiant.nom} - {etudiant.matricule}
            </MenuItem>
          ))}
        </TextField>

        <TextField fullWidth label="Année Universitaire" value={annee_univ} onChange={(e) => setAnneeUniv(e.target.value)} style={{ marginBottom: '15px', fontFamily: 'Poppins' }}/>

        <TextField fullWidth type="date" label="Date" InputLabelProps={{ shrink: true }} value={date} onChange={(e) => setDate(e.target.value)} style={{ marginBottom: '15px', fontFamily: 'Poppins' }}/>

        <TextField fullWidth label="Nombre de Mois" type="number" value={nbrMois} onChange={(e) => setNbrMois(e.target.value)} style={{ marginBottom: '15px', fontFamily: 'Poppins' }}/>

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

export default ModalAjoutPaiement;

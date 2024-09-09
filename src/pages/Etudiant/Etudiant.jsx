import React, { useState, useEffect } from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Box, TextField, RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import { getAllEtudiants, updateEtudiant, deleteEtudiant } from '../Etudiant/services/EtudiantService';
import ModalModificationEtudiant from './modalModificationEtudiant';
import ModalAjoutEtudiant from './modalAjoutEtudiant';
import ModalSuppressionEtudiant from './modalSuppressionEtudiant';

const Etudiant = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [selectedEtudiant, setSelectedEtudiant] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [etudiantToDelete, setEtudiantToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('nom');
  const [filterNiveau, setFilterNiveau] = useState('');
  const [filterEtablissement, setFilterEtablissement] = useState('');
  const [showMineurs, setShowMineurs] = useState(false);

  useEffect(() => {
    fetchEtudiants();
  }, []);

  const fetchEtudiants = async () => {
    try {
      const data = await getAllEtudiants();
      data.sort((a, b) => a.matricule.localeCompare(b.matricule));
      data.forEach(etudiant => {
        etudiant.datenais = etudiant.datenais.split('T')[0];
      });
      setEtudiants(data);
    } catch (error) {
      console.error('Erreur:', error);
      setEtudiants([]);
    }
  };

  const handleEdit = (matricule) => {
    const etudiantToEdit = etudiants.find((etudiant) => etudiant.matricule === matricule);
    setSelectedEtudiant({ ...etudiantToEdit });
  };

  const handleDelete = (matricule) => {
    const etudiant = etudiants.find((etudiant) => etudiant.matricule === matricule);
    setEtudiantToDelete(etudiant);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (matricule) => {
    try {
      await deleteEtudiant(matricule);
      await fetchEtudiants();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'étudiant:', error);
    }
  };

  const handleSaveEtudiant = async (updatedEtudiant) => {
    try {
      const updatedData = await updateEtudiant(updatedEtudiant.matricule, updatedEtudiant);
      await fetchEtudiants();
      setSelectedEtudiant(null);
    } catch (error) {
      console.error('Erreur lors de la modification de l\'étudiant:', error);
    }
  };

  const handleCancel = () => {
    setSelectedEtudiant(null);
  };

  const handleAddEtudiant = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddSuccess = async () => {
    try {
      await fetchEtudiants();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'étudiant:', error);
    }
  };

const filterMineurs = (etudiant) => {
  const dateNaissance = new Date(etudiant.datenais);
  const today = new Date();
  let age = today.getFullYear() - dateNaissance.getFullYear();
  const m = today.getMonth() - dateNaissance.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dateNaissance.getDate())) {
    age--;
  }
  return age < 18;
};

  const filteredEtudiants = etudiants.filter(etudiant => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const lowerCaseEtablissement = filterEtablissement.toLowerCase();
    const lowerCaseNiveau = filterNiveau.toLowerCase();

    if (searchType === 'matricule') {
      if (!etudiant.matricule.toLowerCase().includes(lowerCaseSearchTerm)) {
        return false;
      }
    } else if (searchType === 'nom') {
      if (!etudiant.nom.toLowerCase().includes(lowerCaseSearchTerm)) {
        return false;
      }
    } else if (searchType === 'email') {
      if (!etudiant.mail.toLowerCase().includes(lowerCaseSearchTerm)) {
        return false;
      }
    }

    // Filtrage par niveau
    if (filterNiveau && !etudiant.niveau.toLowerCase().includes(lowerCaseNiveau)) {
      return false;
    }
    if (filterEtablissement && !etudiant.institution.toLowerCase().includes(lowerCaseEtablissement)) {
      return false;
    }
    if (showMineurs && !filterMineurs(etudiant)) {
      return false;
    }
    return true;
  });

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>

          <TextField label="Recherche un étudiant" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ marginBottom: '15px', width: '19%' }} InputProps={{ endAdornment: <SearchIcon />, }}/>

          <RadioGroup row aria-label="searchType" name="searchType" value={searchType} onChange={(e) => setSearchType(e.target.value)} style={{ marginRight: '250px' }}>
            <FormControlLabel value="nom" control={<Radio />} label="Nom" />
            <FormControlLabel value="matricule" control={<Radio />} label="Matricule" />
            <FormControlLabel value="email" control={<Radio />} label="Email" />
          </RadioGroup>

          <TextField label="Recherche Niveau" variant="outlined" value={filterNiveau} onChange={(e) => setFilterNiveau(e.target.value)} style={{ marginLeft: '200px', width: '12%', marginTop: '-15px' }} InputProps={{ endAdornment: <SearchIcon />, }}/>

          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '15px', marginLeft: '40px' }}>
            <TextField label="Recherche Établissement" variant="outlined" value={filterEtablissement} onChange={(e) => setFilterEtablissement(e.target.value)} style={{ width: '200%' }} InputProps={{ endAdornment: <SearchIcon />,}}/>
          </Box>
          <FormControlLabel control={<Checkbox checked={showMineurs} onChange={(e) => setShowMineurs(e.target.checked)} />} label="Afficher les étudiants mineurs"/>
          <Button variant="contained" color="primary" onClick={handleAddEtudiant} style={{ marginBottom: '15px', backgroundColor: 'green', color: 'white' }}>
            AJOUTER
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ maxHeight: 560 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>MATRICULE</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>NOM</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>SEXE</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>DATE DE NAISSANCE</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>INSTITUTION</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>NIVEAU</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>EMAIL</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>ANNEE UNIVERSITAIRE</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredEtudiants.map((etudiant) => (
                <TableRow key={etudiant.matricule}>
                  <TableCell style={{ textAlign: 'center' }}>{etudiant.matricule}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{etudiant.nom}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{etudiant.sexe}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{etudiant.datenais}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{etudiant.institution}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{etudiant.niveau}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{etudiant.mail}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{etudiant.annee_univ}</TableCell>

                  <TableCell style={{ textAlign: 'center' }}>
                    <IconButton onClick={() => handleEdit(etudiant.matricule)} style={{ backgroundColor: '#2196f3', borderRadius: '3px', margin: '5px', color: '#fff' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(etudiant.matricule)} style={{ backgroundColor: '#f44336', borderRadius: '3px', margin: '5px', color: '#fff' }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      {selectedEtudiant && (
        <ModalModificationEtudiant etudiant={selectedEtudiant} onSave={handleSaveEtudiant} onClose={handleCancel} />
      )}

      {isAddModalOpen && (
        <ModalAjoutEtudiant onClose={handleCloseAddModal} onAddSuccess={handleAddSuccess} />
      )}

      {isDeleteModalOpen && etudiantToDelete && (
        <ModalSuppressionEtudiant open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onDelete={handleDeleteConfirm} etudiant={etudiantToDelete}/>
      )}
    </Card>
  );
};

export default Etudiant;

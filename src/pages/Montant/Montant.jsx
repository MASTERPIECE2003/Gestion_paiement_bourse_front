import React, { useState, useEffect } from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Box, TextField } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import { getAllMontants, updateMontant, deleteMontant } from '../Montant/Services/MontantService';
import ModalModificationMontant from './modalModificationMontant';
import ModalAjoutMontant from './modalAjoutMontant';
import ModalSuppressionMontant from './modalSuppressionMontant';

const Montant = () => {
  const [montants, setMontants] = useState([]);
  const [selectedMontant, setSelectedMontant] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [montantToDelete, setMontantToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMontants();
  }, []);

  const fetchMontants = async () => {
    try {
      const data = await getAllMontants();
      data.sort((a, b) => a.niveau.localeCompare(b.niveau));
      setMontants(data);
    } catch (error) {
      console.error('Erreur:', error);
      setMontants([]);
    }
  };

  const handleEdit = (idniv) => {
    const montantToEdit = montants.find((montant) => montant.idniv === idniv);
    setSelectedMontant({ ...montantToEdit });
  };

  const handleDelete = (idniv) => {
    const montant = montants.find((montant) => montant.idniv === idniv);
    setMontantToDelete(montant);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (idniv) => {
    try {
      await deleteMontant(idniv);
      await fetchMontants();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la suppression du montant:', error);
    }
  };

  const handleSaveMontant = async (updatedMontant) => {
    try {
      const updatedData = await updateMontant(updatedMontant.idniv, updatedMontant);
      await fetchMontants();
      setSelectedMontant(null);
    } catch (error) {
      console.error('Erreur lors de la modification du montant:', error);
    }
  };

  const handleCancel = () => {
    setSelectedMontant(null);
  };

  const handleAddMontant = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddSuccess = async () => {
    try {
      await fetchMontants();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du montant:', error);
    }
  };

  const filteredMontants = montants.filter(montant => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      montant.niveau.toLowerCase().includes(lowerCaseSearchTerm) ||
      montant.montant.toString().toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField label="Recherche un montant" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ marginBottom: '15px', width: '19%' }} InputProps={{ endAdornment: <SearchIcon />,}}/>

          <Button variant="contained" color="primary" onClick={handleAddMontant} style={{ marginBottom: '15px', backgroundColor: 'green', color: 'white' }}>
            AJOUTER
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ maxHeight: 560 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>IDNIV</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>NIVEAU</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>MONTANT</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredMontants.map((montant) => (
                <TableRow key={montant.idniv}>
                  <TableCell style={{ textAlign: 'center' }}>{montant.idniv}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{montant.niveau}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{montant.montant}</TableCell>

                  <TableCell style={{ textAlign: 'center' }}>
                    <IconButton onClick={() => handleEdit(montant.idniv)} style={{ backgroundColor: '#2196f3', borderRadius: '3px', margin: '5px', color: '#fff' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(montant.idniv)} style={{ backgroundColor: '#f44336', borderRadius: '3px', margin: '5px', color: '#fff' }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      {selectedMontant && (
        <ModalModificationMontant montant={selectedMontant} onSave={handleSaveMontant} onClose={handleCancel} />
      )}

      {isAddModalOpen && (
        <ModalAjoutMontant open={isAddModalOpen} onClose={handleCloseAddModal} onAddSuccess={handleAddSuccess} />
      )}

      {isDeleteModalOpen && montantToDelete && (
        <ModalSuppressionMontant open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onDelete={handleDeleteConfirm} montant={montantToDelete}/>
      )}
    </Card>
  );
};

export default Montant;

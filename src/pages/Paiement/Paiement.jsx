import React, { useState, useEffect } from 'react';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, CardActions, } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, PictureAsPdf as PdfIcon, Email as EmailIcon } from '@mui/icons-material';
import ModalAjoutPaiement from './modalAjoutPaiement';
import ModalModificationPaiement from './modalModificationPaiement';
import ModalSuppressionPaiement from './modalSuppressionPaiement';
import EmailModal from './modalEnvoieEmail';

import { getAllPayers, deletePayer, updatePaiement, generateReceipt, notifyLatePayments } from '../Paiement/Services/PaiementService';

const Paiement = () => {
  const [payers, setPayers] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false); // Ajout de setOpenEmailModal
  const [selectedEditPaiement, setSelectedEditPaiement] = useState(null);
  const [selectedDeletePaiement, setSelectedDeletePaiement] = useState(null);
  const [selectedMatriculeForEmail, setSelectedMatriculeForEmail] = useState(null);

  useEffect(() => {
    fetchPayers();
  }, []);

  const fetchPayers = async () => {
    try {
      const data = await getAllPayers();
      data.sort((a, b) => a.idpaye - b.idpaye);
      setPayers(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des paiements:', error);
    }
  };

  const handleAddSuccess = () => {
    fetchPayers();
    setOpenAddModal(false);
  };

  const handleEditSave = async (updatedPaiement) => {
    try {
      await updatePaiement(updatedPaiement.idpaye, updatedPaiement);
      fetchPayers();
      setSelectedEditPaiement(null);
      setOpenEditModal(false);
    } catch (error) {
      console.error('Erreur lors de la modification du paiement:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePayer(id);
      fetchPayers();
      setSelectedDeletePaiement(null);
      setOpenDeleteModal(false);
    } catch (error) {
      console.error('Erreur lors de la suppression du paiement:', error);
    }
  };

  const openEditPaiementModal = (paiement) => {
    setSelectedEditPaiement(paiement);
    setOpenEditModal(true);
  };

  const openDeletePaiementModal = (paiement) => {
    setSelectedDeletePaiement(paiement);
    setOpenDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedDeletePaiement(null);
  };

  const handleGenerateReceipt = async (matricule) => {
    try {
      const pdfBlob = await generateReceipt(matricule);
      const url = window.URL.createObjectURL(new Blob([pdfBlob], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'recu_paiement.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Erreur lors de la génération du reçu PDF:', error);
    }
  };

  const handleSendLatePaymentNotifications = async () => {
    try {
      await notifyLatePayments();
      alert("Notifications de retard envoyées avec succès !");
      fetchPayers(); // Rafraîchir la liste des paiements après l'envoi des notifications
    } catch (error) {
      console.error('Erreur lors de l\'envoi des notifications de retard :', error);
      alert("Erreur lors de l'envoi des notifications de retard.");
    }
  };

  const openEmailModalForMatricule = (matricule) => {
    setSelectedMatriculeForEmail(matricule);
    setOpenEmailModal(true);
  };

  return (
    <div>
      <Card>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={() => setOpenAddModal(true)} sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
            AJOUTER
          </Button>
          <IconButton
            onClick={() => openEmailModalForMatricule(selectedMatriculeForEmail)} // Ouvre le modal Email
            style={{ backgroundColor: '#ff5722', borderRadius: '3px', margin: '5px', color: '#fff' }}>
            <EmailIcon />
          </IconButton>
        </CardActions>
        <CardContent>
          <TableContainer component={Paper} style={{ marginTop: '20px', maxHeight: 600 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>ID PAIEMENT</TableCell>
                  <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>MATRICULE</TableCell>
                  <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>ANNEE UNIVERSITAIRE</TableCell>
                  <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>DATE</TableCell>
                  <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>NOMBRE DE MOIS</TableCell>
                  <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payers.map((payer) => (
                  <TableRow key={payer.idpaye}>
                    <TableCell style={{ textAlign: 'center' }}>{payer.idpaye}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{payer.etudiant && payer.etudiant.matricule}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{payer.annee_univ}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{payer.date}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{payer.nbrMois}</TableCell>

                    <TableCell style={{ textAlign: 'center' }}>
                      <IconButton onClick={() => openEditPaiementModal(payer)} style={{ backgroundColor: '#2196f3', borderRadius: '3px', margin: '5px', color: '#fff' }}>
                        <EditIcon />
                      </IconButton>

                      <IconButton onClick={() => openDeletePaiementModal(payer)} style={{ backgroundColor: '#f44336', borderRadius: '3px', margin: '5px', color: '#fff' }}>
                        <DeleteIcon/>
                      </IconButton>

                      <IconButton onClick={() => handleGenerateReceipt(payer.etudiant.matricule)} style={{ backgroundColor: '#ff9800', borderRadius: '3px', margin: '5px', color: '#fff' }}>
                        <PdfIcon />
                      </IconButton>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <ModalAjoutPaiement open={openAddModal} onClose={() => setOpenAddModal(false)} onAddSuccess={handleAddSuccess} />

      {selectedEditPaiement && (
        <ModalModificationPaiement open={openEditModal} paiement={selectedEditPaiement} onClose={() => { setOpenEditModal(false); setSelectedEditPaiement(null); }} onSave={handleEditSave}/>)}

        <ModalSuppressionPaiement open={openDeleteModal} onClose={closeDeleteModal} onDelete={() => handleDelete(selectedDeletePaiement.idpaye)} paiement={selectedDeletePaiement}/>

        <EmailModal open={openEmailModal} onClose={() => setOpenEmailModal(false)} matricule={selectedMatriculeForEmail}/>
    </div>
  );
};

export default Paiement;

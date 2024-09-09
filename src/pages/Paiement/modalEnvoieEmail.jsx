import React, { useState } from 'react';
import { Modal, Button, TextField, Card, CardContent, Typography, Box } from '@mui/material';
import { sendEmail } from '../Paiement/Services/EmailService'; // Assurez-vous d'importer correctement la fonction

const ModalEnvoieEmail = ({ open, onClose, matricule }) => {
  const [recipientEmail, setRecipientEmail] = useState('');

  const handleSendEmail = async () => {
    try {
      await sendEmail(matricule, recipientEmail);
      alert('Email envoyé avec succès !');
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email :', error);
      alert('Erreur lors de l\'envoi de l\'email.');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Envoi d'Email
            </Typography>

            <TextField label="Email du destinataire" variant="outlined" fullWidth value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} style={{ marginBottom: 5, marginTop: 10 }}/>

            <Box display="flex" justifyContent="center" mt={2}>
              <Button variant="contained" color="primary" onClick={handleSendEmail} style={{ marginRight: 10 }}>
                ENVOYER
              </Button>
              <Button variant="contained" onClick={onClose} style={{ backgroundColor: '#9c27b0', color: '#fff' }}>
                ANNULER
              </Button>
            </Box>
          </CardContent>
        </Card>
      </div>
    </Modal>
  );
};

export default ModalEnvoieEmail;

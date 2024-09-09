import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082';

const sendEmail = async (matricule, recipientEmail) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/payers/send-email`, { matricule, recipientEmail });
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de l'envoi de l'email : ${error.message}`);
  }
};

export { sendEmail };

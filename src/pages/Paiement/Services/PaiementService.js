import axios from 'axios';

const API_URL = 'http://localhost:8082/payers';
const STUDENTS_API_URL = 'http://localhost:8082/etudiants';

export const getAllPayers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addPaiement = async (paiement) => {
  const response = await axios.post(API_URL, paiement);
  return response.data;
};

export const updatePaiement = async (idpaye, paiement) => {
  const response = await axios.put(`${API_URL}/${idpaye}`, paiement);
  return response.data;
};

export const deletePayer = async (idpaye) => {
  const response = await axios.delete(`${API_URL}/${idpaye}`);
  return response.data;
};

export const getAllEtudiants = async () => {
  const response = await axios.get(STUDENTS_API_URL);
  return response.data;
};
export const notifyLatePayments = async () => {
  try {
    const response = await axios.post(`${API_URL}/notify-late-payments`);
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de l\'envoi des notifications de retard de paiement:', error);
  }
};
export const generateReceipt = async (matricule) => {
  const response = await axios.get(`${API_URL}/recu/${matricule}`, { responseType: 'blob' });
  return response.data;
};

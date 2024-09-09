import axios from 'axios';

const URL = 'http://localhost:8082'; // Mettez ici l'URL de votre API backend

export const getAllMontants = async () => {
  try {
    const response = await axios.get(`${URL}/montants`);
    return response.data;
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
};

export const addMontant = async (montantData) => {
  try {
    const response = await axios.post(`${URL}/montants`, montantData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un nouveau montant:', error);
    throw error;
  }
};

export const updateMontant = async (idniv, montantData) => {
  try {
    const response = await axios.put(`${URL}/montants/${idniv}`, montantData);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du montant avec l'idniv ${idniv}:`, error);
    throw error;
  }
};

export const deleteMontant = async (idniv) => {
  try {
    await axios.delete(`${URL}/montants/${idniv}`);
  } catch (error) {
    console.error(`Erreur lors de la suppression du montant avec l'idniv ${idniv}:`, error);
    throw error;
  }
};

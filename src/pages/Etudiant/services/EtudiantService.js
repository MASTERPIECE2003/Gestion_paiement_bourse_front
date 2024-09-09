import axios from 'axios';

const URL = 'http://localhost:8082'; // URL API backend

export const getAllEtudiants = async () => {
  try {
    const response = await axios.get(`${URL}/etudiants`);
    return response.data;
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
};

export const updateEtudiant = async (matricule, etudiantData) => {
  try {
    const response = await axios.put(`${URL}/etudiants/${matricule}`, etudiantData);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'étudiant avec le matricule ${matricule}:`, error);
    throw error;
  }
};

export const addEtudiant = async (etudiantData) => {
  try {
    const response = await axios.post(`${URL}/etudiants`, etudiantData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un nouvel étudiant:', error);
    throw error;
  }
};

export const deleteEtudiant = async (matricule) => {
  try {
    await axios.delete(`${URL}/etudiants/${matricule}`);
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'étudiant avec le matricule ${matricule}:`, error);
    throw error;
  }
};

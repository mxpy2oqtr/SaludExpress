import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPatients = () => api.get('/patients');
export const createPatient = (patientData) => api.post('/patients', patientData);

export const getResults = () => api.get('/results');
export const addResult = (resultData) => api.post('/results', resultData);

export const getAlerts = () => api.get('/results/alerts');

export default api;

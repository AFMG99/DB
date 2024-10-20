import axios from 'axios';

const API_URL = 'http://localhost:8085/';

export const loginUser = async (username, password) => {
    const response = await axios.post(`${API_URL}login`, { username, password });
    return response.data;
};

export const getPerfilData = async (idUsuario) => {
    const response = await axios.get(`${API_URL}perfil?idUsuario=${idUsuario}`);
    return response.data;
};

export const password = async (username, newPassword) => {
    const response = await axios.post(`${API_URL}cambiar-contrasena`, { username, newPassword });
    return response.data;
};
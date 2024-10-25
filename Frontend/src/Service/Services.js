import axios from 'axios';

const API_URL = 'http://localhost:3000/';

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
 
export const muebles = async () => {
    const response = await axios.get(`${API_URL}muebles`);
    return response.data;
}

export const crearMueble = async (mueble) => {
    const response = await axios.post(`${API_URL}mueble`, mueble);
    return response.data;
}

export const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}usuarios`);
    return response.data;
}

export const getAllAvion = async ()=>{
    const response = await axios.get(`${API_URL}aviones`);
    return response.data;
}

export const insertarAvion = async (avion) => {
    const response = await axios.post(`${API_URL}avion`, avion);
    return response.data;
}

export const infoNomina = async()=>{
    const response = await axios.get(`${API_URL}nomina`, infoNomina);
    return response.data;
}
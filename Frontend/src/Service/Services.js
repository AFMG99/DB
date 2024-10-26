import axios from 'axios';

const API_URL = 'http://localhost:3000/';

// Modulo de Login
export const loginUser = async (username, password) => {
    const response = await axios.post(`${API_URL}login`, { username, password });
    return response.data;
};

export const password = async (username, newPassword) => {
    const response = await axios.post(`${API_URL}cambiar-contrasena`, { username, newPassword });
    return response.data;
};

// Modulo de Usuarios y Perfil
export const Users = async () => {
    const response = await axios.get(`${API_URL}usuarios`);
    return response.data;
}

export const getPerfilData = async (idUsuario) => {
    const response = await axios.get(`${API_URL}perfil?idUsuario=${idUsuario}`);
    return response.data;
};

// Modulo de Empleados
export const crearEmpleado = async (empleado) => {
    const response = await axios.post(`${API_URL}crear-empleado`, empleado);
    return response.data;
};

export const getAllEmpleados = async () => {
    const response = await axios.get(`${API_URL}empleados`);
    return response.data;
}

export const consultarEmpleado = async (cedula) => {
    const response = await axios.get(`${API_URL}empleado?cedula=${cedula}`);
    return response.data;
}

export const modificarEmpleado = async (empleado) => {
    const response = await axios.put(`${API_URL}actualizar-empleado`, empleado);
    return response.data;
}

// Modulo de Sedes
export const getAllSedes = async () => {
    const response = await axios.get(`${API_URL}sedes`);
    return response.data;
}

export const consultarSede = async (idSede) => {
    const response = await axios.get(`${API_URL}sede?idSede=${idSede}`);
    return response.data;
}

export const crearSede = async (nuevaSede) => {
    const response = await axios.post(`${API_URL}crear-sede`, nuevaSede);
    return response.data;
}

export const modificarSede = async (sede) => {
    const response = await axios.put(`${API_URL}actualizar-sede`, sede);
    return response.data;
}

// Modulo Nomina
export const nominas = async () => {
    const response = await axios.get(`${API_URL}nominas`);
    return response.data;
}

// Modulo Vuelos
export const vuelos = async () => {
    const response = await axios.get(`${API_URL}vuelos`);
    return response.data;
}

// Modulo Cliente
export const clientes = async () => {
    const response = await axios.get(`${API_URL}clientes`);
    return response.data;
}

export const crearCliente = async (cliente) => {
    const response = await axios.post(`${API_URL}crear-cliente`, cliente);
    return response.data;
} 

export const modificarCliente = async (cliente) => {
    const response = await axios.put(`${API_URL}actulizar-cliente`, cliente);
    return response.data;
}
 
export const muebles = async () => {
    const response = await axios.get(`${API_URL}muebles`);
    return response.data;
}

export const crearMueble = async (mueble) => {
    const response = await axios.post(`${API_URL}mueble`, mueble);
    return response.data;
}

export const modificarMueble = async (mueble) => {
    // alert("=====>")
    const response = await axios.put(`${API_URL}modificar-mueble`, mueble);
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

export const modificarAvion = async (avion) => {
    const response = await axios.put(`${API_URL}modificar-avion`, avion);
    return response.data;
}

import { getAllUsers, authenticateUser, updatePassword } from "../Model/LoginModel.js";
import jwt from 'jsonwebtoken';
import crypto from 'crypto'

const Users = async (req, res) => {
    try {
        const users = await getAllUsers();

        // Encriptar la contraseña de cada usuario antes de enviarla
        const encryptedUsers = users.map(user => {
            // Crear el hash para la contraseña
            const hash = crypto.createHash('sha1').update(user.Contrasena).digest('hex');
            return {
                ...user,
                Contrasena: hash, // Reemplazar el campo de la contraseña con el hash
            };
        });

        res.json(encryptedUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Por favor ingrese username y password' });
    }

    console.log('Datos recibidos:', username, password);

    try {
        const data = await authenticateUser(username, password);

        console.log('Resultado de la consulta:', data);

        if (data.length > 0) {
            const token = jwt.sign({ username }, 'Stack', { expiresIn: '1h'});
            const idUsuario = data[0].Id_usuario;
            return res.json({
                message: 'Inicio de sesión exitoso',
                token,
                idUsuario,
                data
            });
        } else {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error interno en el servidor', error: error.message });
    }
};

const chagePassword = async (req, res) => {
    const { username, newPassword } = req.body;
    console.log('Datos recibidos para cambio de contraseña:', username, newPassword);

    if (!username || !newPassword) {
        return res.status(400).json({ message: 'Por favor complete todos los campos.' });
    }

    try {
        const result = await updatePassword(username, newPassword);
        res.json(result);
    } catch (error) {
        console.error('Error al cambiar contraseña:', error);
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export { Users, login, chagePassword }
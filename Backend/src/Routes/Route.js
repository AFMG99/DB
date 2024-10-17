import express from 'express';
import { Users, login, chagePassword } from '../Controller/LoginController.js';
import { profile } from '../Controller/PerfilController.js';

const router = express.Router();

router.get('/usuarios', Users);
router.get('/perfil', profile);
router.post('/login', login);
router.post('/cambiar-contrasena', chagePassword);

export default router;
import express from 'express';
import { Users, login, chagePassword } from '../Controller/LoginController.js';
import { profile } from '../Controller/PerfilController.js';
import { aviones, crearAvion } from '../Controller/AvionController.js';
import { crearMueble } from '../Controller/MuebleController.js';
import { muebles } from '../Controller/MuebleController.js';
import { informeNom } from '../Controller/InforNomController.js';


const router = express.Router();

router.get('/usuarios', Users);
router.get('/perfil', profile);
router.post('/login', login);
router.post('/cambiar-contrasena', chagePassword);
router.get('/aviones', aviones);
router.post('/avion', crearAvion)
router.post('/mueble', crearMueble);
router.get('/muebles', muebles);
router.get('/nomina', informeNom);

export default router;
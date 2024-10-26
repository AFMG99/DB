import express from 'express';
import { Users, login, chagePassword } from '../Controller/LoginController.js';
import { profile } from '../Controller/PerfilController.js';
import { aviones, crearAvion, modificarAvion } from '../Controller/AvionController.js';
import { crearMueble, modificarMueble } from '../Controller/MuebleController.js';
import { muebles } from '../Controller/MuebleController.js';
import { informeNom } from '../Controller/InforNomController.js';



const router = express.Router();

router.get('/usuarios', Users);
router.get('/perfil', profile);
router.post('/login', login);
router.post('/cambiar-contrasena', chagePassword);
router.get('/aviones', aviones);
router.post('/avion', crearAvion)
router.put("/modificar-avion", modificarAvion)
router.post('/mueble', crearMueble);
router.get('/muebles', muebles);
router.put('/modificar-mueble', modificarMueble);
router.get('/nomina', informeNom);

export default router;
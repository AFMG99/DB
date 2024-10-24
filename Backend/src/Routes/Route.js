import express from 'express';
import { Users, login, chagePassword } from '../Controller/LoginController.js';
import { profile } from '../Controller/PerfilController.js';
import { consultarEmpleado, crearEmpleado, empleados } from '../Controller/EmpleadoController.js';
import { consultarSede, crearSede, sedes } from '../Controller/SedesController.js';

const router = express.Router();

router.post('/crear-empleado', crearEmpleado);
router.get('/empleados', empleados);
router.get('/empleado', consultarEmpleado);

router.get('/usuarios', Users);
router.get('/perfil', profile);
router.post('/login', login);
router.post('/cambiar-contrasena', chagePassword);

router.get('/sedes', sedes);
router.get('/sede', consultarSede);
router.post('/crear-sede', crearSede);

export default router;
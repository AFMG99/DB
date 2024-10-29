import express from 'express';
import { Users, login, chagePassword } from '../Controller/LoginController.js';
import { profile } from '../Controller/PerfilController.js';
import { consultarEmpleado, crearEmpleado, empleados, modificarEmpleado } from '../Controller/EmpleadoController.js';
import { consultarSede, crearSede, modificarSede, sedes } from '../Controller/SedesController.js';
import { vuelos } from '../Controller/VuelosController.js';
import { clientes, crearCliente, modificarCliente } from '../Controller/ClienteController.js';
import { aviones, crearAvion, modificarAvion } from '../Controller/AvionController.js';
import { crearMueble, modificarMueble } from '../Controller/MuebleController.js';
import { muebles } from '../Controller/MuebleController.js';
import { informeNom } from '../Controller/InforNomController.js';
import { ventas } from '../Controller/VentasController.js';
import { crearUsuario, modificarUsuario } from '../Controller/UsuarioController.js';



const router = express.Router();

router.post('/crear-usuario', crearUsuario);
router.put('/actualizar-usuario', modificarUsuario);

router.post('/crear-empleado', crearEmpleado);
router.put('/actualizar-empleado', modificarEmpleado);
router.get('/empleados', empleados);
router.get('/empleado', consultarEmpleado);

router.get('/usuarios', Users);
router.get('/perfil', profile);
router.post('/login', login);
router.post('/cambiar-contrasena', chagePassword);

router.get('/sedes', sedes);
router.get('/sede', consultarSede);
router.post('/crear-sede', crearSede);
router.put('/actualizar-sede', modificarSede);

router.get('/vuelos', vuelos);

router.get('/clientes', clientes);
router.post('/crear-cliente', crearCliente);
router.put('/actulizar-cliente', modificarCliente);
router.get('/aviones', aviones);
router.post('/avion', crearAvion)
router.put("/modificar-avion", modificarAvion)
router.post('/mueble', crearMueble);
router.get('/muebles', muebles);
router.put('/modificar-mueble', modificarMueble);
router.get('/nomina', informeNom);
router.get('/ventas', ventas)

export default router;
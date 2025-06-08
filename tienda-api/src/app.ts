import 'dotenv/config';
import express from 'express';
import { UsuarioController } from './controllers/usuarioController';
import { DireccionController } from './controllers/direccionController';
import { UsuarioDireccionController } from './controllers/usuarioDireccionController';
import { OrdenCompraController } from './controllers/ordenCompraController';
const app = express();
app.use(express.json());

const usuarioController = new UsuarioController();
const direccionController = new DireccionController();
const usuarioDireccionController = new UsuarioDireccionController();
const ordenCompraController = new OrdenCompraController();
// Rutas para Usuario
app.post('/api/usuarios/register', (req, res) => usuarioController.register(req, res));
app.get('/api/usuarios', (req, res) => usuarioController.getAll(req, res));
app.get('/api/usuarios/:id', (req, res) => usuarioController.getById(req, res));
app.put('/api/usuarios/:id', (req, res) => usuarioController.update(req, res));
app.delete('/api/usuarios/:id', (req, res) => usuarioController.delete(req, res));
app.post('/api/usuarios/login', (req, res) => usuarioController.login(req, res));

// Rutas para Direccion
app.post('/api/direcciones', (req, res) => direccionController.create(req, res));
app.get('/api/direcciones', (req, res) => direccionController.getAll(req, res));
app.get('/api/direcciones/:id', (req, res) => direccionController.getById(req, res));
app.put('/api/direcciones/:id', (req, res) => direccionController.update(req, res));
app.delete('/api/direcciones/:id', (req, res) => direccionController.delete(req, res));

// Rutas para Usuario_Direccion
app.post('/api/usuario-direccion', (req, res) => usuarioDireccionController.create(req, res));
app.get('/api/usuario-direccion', (req, res) => usuarioDireccionController.getAll(req, res));
app.get('/api/usuario-direccion/:id', (req, res) => usuarioDireccionController.getById(req, res));
app.put('/api/usuario-direccion/:id', (req, res) => usuarioDireccionController.update(req, res));
app.delete('/api/usuario-direccion/:id', (req, res) => usuarioDireccionController.delete(req, res));

// Rutas para Orden_Compra
app.post('/api/orden-compra', (req, res) => ordenCompraController.create(req, res));
app.get('/api/orden-compra', (req, res) => ordenCompraController.getAll(req, res));
app.get('/api/orden-compra/:id', (req, res) => ordenCompraController.getById(req, res));
app.put('/api/orden-compra/:id', (req, res) => ordenCompraController.update(req, res));
app.delete('/api/orden-compra/:id', (req, res) => ordenCompraController.delete(req, res));

// Añadir exportación por defecto
export default app;


import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const usuarioController = new UsuarioController();

router.get('/usuarios', authenticateToken, usuarioController.getAll.bind(usuarioController));
router.get('/usuarios/:id', authenticateToken, usuarioController.getById.bind(usuarioController));
router.post('/usuarios/register', usuarioController.register.bind(usuarioController));
router.put('/usuarios/:id', authenticateToken, usuarioController.update.bind(usuarioController));
router.delete('/usuarios/:id', authenticateToken, usuarioController.delete.bind(usuarioController));
router.post('/usuarios/login', usuarioController.login.bind(usuarioController));

export default router;
import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const usuarioController = new UsuarioController();

router.get('/usuarios', authenticateToken, usuarioController.getAll);
router.get('/usuarios/:id', authenticateToken, usuarioController.getById);
router.post('/usuarios/register', usuarioController.register);
router.put('/usuarios/:id', authenticateToken, usuarioController.update);
router.delete('/usuarios/:id', authenticateToken, usuarioController.delete);
router.post('/usuarios/login', usuarioController.login);

export default router;
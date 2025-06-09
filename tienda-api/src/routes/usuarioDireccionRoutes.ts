import { Router } from 'express';
import { UsuarioDireccionController } from '../controllers/usuarioDireccionController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const usuarioDireccionController = new UsuarioDireccionController();

router.post('/usuario-direccion', authenticateToken, usuarioDireccionController.create.bind(usuarioDireccionController));
router.get('/usuario-direccion', authenticateToken, usuarioDireccionController.getAll.bind(usuarioDireccionController));
router.get('/usuario-direccion/:id', authenticateToken, usuarioDireccionController.getById.bind(usuarioDireccionController));
router.put('/usuario-direccion/:id', authenticateToken, usuarioDireccionController.update.bind(usuarioDireccionController));
router.delete('/usuario-direccion/:id', authenticateToken, usuarioDireccionController.delete.bind(usuarioDireccionController));

export default router;

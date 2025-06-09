import { Router } from 'express';
import { CategoriaController } from '../controllers/categoriaController';
import {
  authenticateToken,
  requireAdmin,
  requireAdminOrCliente
} from '../middleware/auth';

const router = Router();
const categoriaController = new CategoriaController();

// Todos los usuarios autenticados pueden ver categorías
router.get('/categorias', authenticateToken, requireAdminOrCliente, categoriaController.getAll.bind(categoriaController));
router.get('/categorias/:id', authenticateToken, requireAdminOrCliente, categoriaController.getById.bind(categoriaController));

// Solo admin puede administrar categorías
router.post('/categorias', authenticateToken, requireAdmin, categoriaController.create.bind(categoriaController));
router.put('/categorias/:id', authenticateToken, requireAdmin, categoriaController.update.bind(categoriaController));
router.delete('/categorias/:id', authenticateToken, requireAdmin, categoriaController.delete.bind(categoriaController));

export default router;
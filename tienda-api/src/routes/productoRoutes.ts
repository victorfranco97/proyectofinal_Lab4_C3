import { Router } from 'express';
import { ProductoController } from '../controllers/productoController';
import {
  authenticateToken,
  requireAdmin,
  requireAdminOrCliente
} from '../middleware/auth';

const router = Router();
const productoController = new ProductoController();

// Todos los usuarios autenticados pueden ver productos
router.get('/productos', authenticateToken, requireAdminOrCliente, productoController.getAll.bind(productoController));
router.get('/productos/:id', authenticateToken, requireAdminOrCliente, productoController.getById.bind(productoController));

// Solo admin puede administrar productos
router.post('/productos', authenticateToken, requireAdmin, productoController.create.bind(productoController));
router.put('/productos/:id', authenticateToken, requireAdmin, productoController.update.bind(productoController));
router.delete('/productos/:id', authenticateToken, requireAdmin, productoController.delete.bind(productoController));

export default router;
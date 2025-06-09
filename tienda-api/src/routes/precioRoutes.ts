import { Router } from 'express';
import { PrecioController } from '../controllers/precioController';
import {
  authenticateToken,
  requireAdmin,
  requireAdminOrCliente
} from '../middleware/auth';

const router = Router();
const precioController = new PrecioController();

// Todos los usuarios autenticados pueden ver precios
router.get('/precios', authenticateToken, requireAdminOrCliente, precioController.getAll.bind(precioController));
router.get('/precios/:id', authenticateToken, requireAdminOrCliente, precioController.getById.bind(precioController));

// Solo admin puede administrar precios
router.post('/precios', authenticateToken, requireAdmin, precioController.create.bind(precioController));
router.put('/precios/:id', authenticateToken, requireAdmin, precioController.update.bind(precioController));
router.delete('/precios/:id', authenticateToken, requireAdmin, precioController.delete.bind(precioController));

export default router;
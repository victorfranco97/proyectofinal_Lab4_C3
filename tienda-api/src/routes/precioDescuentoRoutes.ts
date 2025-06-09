import { Router } from 'express';
import { PrecioDescuentoController } from '../controllers/precioDescuentoController';
import {
  authenticateToken,
  requireAdmin,
  requireAdminOrCliente
} from '../middleware/auth';

const router = Router();
const precioDescuentoController = new PrecioDescuentoController();

// Todos los usuarios autenticados pueden ver precios con descuento
router.get('/precio-descuentos', authenticateToken, requireAdminOrCliente, precioDescuentoController.getAll.bind(precioDescuentoController));
router.get('/precio-descuentos/:id', authenticateToken, requireAdminOrCliente, precioDescuentoController.getById.bind(precioDescuentoController));

// Solo admin puede administrar precios con descuento
router.post('/precio-descuentos', authenticateToken, requireAdmin, precioDescuentoController.create.bind(precioDescuentoController));
router.put('/precio-descuentos/:id', authenticateToken, requireAdmin, precioDescuentoController.update.bind(precioDescuentoController));
router.delete('/precio-descuentos/:id', authenticateToken, requireAdmin, precioDescuentoController.delete.bind(precioDescuentoController));

export default router;
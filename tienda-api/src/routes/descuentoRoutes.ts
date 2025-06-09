import { Router } from 'express';
import { DescuentoController } from '../controllers/descuentoController';
import {
  authenticateToken,
  requireAdmin,
  requireAdminOrCliente
} from '../middleware/auth';

const router = Router();
const descuentoController = new DescuentoController();

// Todos los usuarios autenticados pueden ver descuentos
router.get('/descuentos', authenticateToken, requireAdminOrCliente, descuentoController.getAll.bind(descuentoController));
router.get('/descuentos/:id', authenticateToken, requireAdminOrCliente, descuentoController.getById.bind(descuentoController));

// Solo admin puede administrar descuentos
router.post('/descuentos', authenticateToken, requireAdmin, descuentoController.create.bind(descuentoController));
router.put('/descuentos/:id', authenticateToken, requireAdmin, descuentoController.update.bind(descuentoController));
router.delete('/descuentos/:id', authenticateToken, requireAdmin, descuentoController.delete.bind(descuentoController));

export default router;
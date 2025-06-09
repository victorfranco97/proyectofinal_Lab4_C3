import { Router } from 'express';
import { OrdenCompraController } from '../controllers/ordenCompraController';
import {
  authenticateToken,
  requireAdmin,
  requireAdminOrCliente
} from '../middleware/auth';
import {
  filterByUser,
  validateOrdenOwnership,
  validateUsuarioDireccionInBody
} from '../middleware/ownership';

const router = Router();
const ordenCompraController = new OrdenCompraController();

// Solo admin puede ver todas las órdenes, usuarios ven solo las suyas
router.get('/orden-compra', authenticateToken, filterByUser, ordenCompraController.getAll.bind(ordenCompraController));

// Usuario puede ver su propia orden, admin puede ver cualquiera
router.get('/orden-compra/:id', authenticateToken, validateOrdenOwnership, ordenCompraController.getById.bind(ordenCompraController));

// Autenticado puede crear órdenes (se valida que la dirección le pertenezca)
router.post('/orden-compra', authenticateToken, requireAdminOrCliente, validateUsuarioDireccionInBody, ordenCompraController.create.bind(ordenCompraController));

// Usuario puede actualizar su propia orden, admin puede actualizar cualquiera
router.put('/orden-compra/:id', authenticateToken, validateOrdenOwnership, ordenCompraController.update.bind(ordenCompraController));

// Solo admin puede eliminar órdenes
router.delete('/orden-compra/:id', authenticateToken, requireAdmin, ordenCompraController.delete.bind(ordenCompraController));

export default router;
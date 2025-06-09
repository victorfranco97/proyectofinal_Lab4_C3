import { Router } from 'express';
import { OrdenCompraDetalleController } from '../controllers/ordenCompraDetalleController';
import {
  authenticateToken,
  requireAdmin,
  requireAdminOrCliente
} from '../middleware/auth';
import {
  validateDetalleOrdenOwnership
} from '../middleware/ownership';

const router = Router();
const ordenCompraDetalleController = new OrdenCompraDetalleController();

// Usuario puede ver detalles de sus órdenes, admin puede ver todos
router.get('/orden-compra-detalles', authenticateToken, requireAdminOrCliente, ordenCompraDetalleController.getAll.bind(ordenCompraDetalleController));

// Usuario puede ver detalle específico de su orden, admin puede ver cualquiera
router.get('/orden-compra-detalles/:id', authenticateToken, validateDetalleOrdenOwnership, ordenCompraDetalleController.getById.bind(ordenCompraDetalleController));

// Autenticado puede crear detalles (se valida que la orden le pertenezca)
router.post('/orden-compra-detalles', authenticateToken, requireAdminOrCliente, validateDetalleOrdenOwnership, ordenCompraDetalleController.create.bind(ordenCompraDetalleController));

// Usuario puede actualizar detalles de su orden, admin puede actualizar cualquiera
router.put('/orden-compra-detalles/:id', authenticateToken, validateDetalleOrdenOwnership, ordenCompraDetalleController.update.bind(ordenCompraDetalleController));

// Solo admin puede eliminar detalles de orden
router.delete('/orden-compra-detalles/:id', authenticateToken, requireAdmin, ordenCompraDetalleController.delete.bind(ordenCompraDetalleController));

export default router;

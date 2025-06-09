import { Router } from 'express';
import { DireccionController } from '../controllers/direccionController';
import {
  authenticateToken,
  requireAdminOrCliente
} from '../middleware/auth';
import {
  filterByUser,
  validateDireccionOwnership
} from '../middleware/ownership';

const router = Router();
const direccionController = new DireccionController();

// Crear dirección (autenticado)
router.post('/direcciones', authenticateToken, requireAdminOrCliente, direccionController.create.bind(direccionController));

// Listar direcciones: admin ve todas, usuarios ven solo las suyas
router.get('/direcciones', authenticateToken, requireAdminOrCliente, filterByUser, direccionController.getAll.bind(direccionController));

// Ver dirección específica: validar propiedad
router.get('/direcciones/:id', authenticateToken, requireAdminOrCliente, validateDireccionOwnership, direccionController.getById.bind(direccionController));

// Actualizar dirección: validar propiedad
router.put('/direcciones/:id', authenticateToken, requireAdminOrCliente, validateDireccionOwnership, direccionController.update.bind(direccionController));

// Eliminar dirección: validar propiedad
router.delete('/direcciones/:id', authenticateToken, requireAdminOrCliente, validateDireccionOwnership, direccionController.delete.bind(direccionController));

export default router;

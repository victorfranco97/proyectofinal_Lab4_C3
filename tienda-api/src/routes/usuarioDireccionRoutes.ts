import { Router } from 'express';
import { UsuarioDireccionController } from '../controllers/usuarioDireccionController';
import {
  authenticateToken,
  requireAdmin,
  requireAdminOrCliente
} from '../middleware/auth';
import {
  enforceUserIdInBody,
  filterByUser
} from '../middleware/ownership';

const router = Router();
const usuarioDireccionController = new UsuarioDireccionController();

// Crear relación usuario-dirección: forzar usuario autenticado
router.post('/usuario-direccion', authenticateToken, requireAdminOrCliente, enforceUserIdInBody, usuarioDireccionController.create.bind(usuarioDireccionController));

// Listar relaciones: admin ve todas, usuarios ven solo las suyas
router.get('/usuario-direccion', authenticateToken, requireAdminOrCliente, filterByUser, usuarioDireccionController.getAll.bind(usuarioDireccionController));

// Ver relación específica: admin puede ver todas, usuarios solo las suyas
router.get('/usuario-direccion/:id', authenticateToken, requireAdminOrCliente, usuarioDireccionController.getById.bind(usuarioDireccionController));

// Actualizar relación: solo admin
router.put('/usuario-direccion/:id', authenticateToken, requireAdmin, usuarioDireccionController.update.bind(usuarioDireccionController));

// Eliminar relación: solo admin
router.delete('/usuario-direccion/:id', authenticateToken, requireAdmin, usuarioDireccionController.delete.bind(usuarioDireccionController));

// Soft delete routes for admin
router.patch('/usuario-direccion/:id/restore', authenticateToken, requireAdmin, usuarioDireccionController.restore.bind(usuarioDireccionController));
router.delete('/usuario-direccion/:id/permanent', authenticateToken, requireAdmin, usuarioDireccionController.permanentDelete.bind(usuarioDireccionController));
router.get('/usuario-direccion/deleted', authenticateToken, requireAdmin, usuarioDireccionController.getAllDeleted.bind(usuarioDireccionController));

export default router;

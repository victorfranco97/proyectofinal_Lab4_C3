import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController';
import {
  authenticateAndValidateOwnData,
  authenticateToken,
  requireAdmin
} from '../middleware/auth';

const router = Router();
const usuarioController = new UsuarioController();

// Solo admin puede listar todos los usuarios
router.get('/usuarios', authenticateToken, requireAdmin, usuarioController.getAll.bind(usuarioController));

// Usuario puede ver su propio perfil, admin puede ver cualquiera
router.get('/usuarios/:id', authenticateAndValidateOwnData, usuarioController.getById.bind(usuarioController));

// Registro público (sin autenticación)
router.post('/usuarios/register', usuarioController.register.bind(usuarioController));

// Usuario puede actualizar su propio perfil, admin puede actualizar cualquiera
router.put('/usuarios/:id', authenticateAndValidateOwnData, usuarioController.update.bind(usuarioController));

// Solo admin puede eliminar usuarios
router.delete('/usuarios/:id', authenticateToken, requireAdmin, usuarioController.delete.bind(usuarioController));

// Soft delete routes - Only admin
router.patch('/usuarios/:id/restore', authenticateToken, requireAdmin, usuarioController.restore.bind(usuarioController));
router.delete('/usuarios/:id/permanent', authenticateToken, requireAdmin, usuarioController.permanentDelete.bind(usuarioController));
router.get('/usuarios/deleted', authenticateToken, requireAdmin, usuarioController.getAllDeleted.bind(usuarioController));

// Login público (sin autenticación)
router.post('/usuarios/login', usuarioController.login.bind(usuarioController));

export default router;
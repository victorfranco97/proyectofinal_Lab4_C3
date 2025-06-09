import { Router } from 'express';
import { ImagenController } from '../controllers/imagenController';
import {
  authenticateToken,
  requireAdmin,
  requireAdminOrCliente
} from '../middleware/auth';

const router = Router();
const imagenController = new ImagenController();

// Todos los usuarios autenticados pueden ver imágenes
router.get('/imagenes', authenticateToken, requireAdminOrCliente, imagenController.getAll.bind(imagenController));
router.get('/imagenes/:id', authenticateToken, requireAdminOrCliente, imagenController.getById.bind(imagenController));

// Solo admin puede administrar imágenes
router.post('/imagenes', authenticateToken, requireAdmin, imagenController.create.bind(imagenController));
router.put('/imagenes/:id', authenticateToken, requireAdmin, imagenController.update.bind(imagenController));
router.delete('/imagenes/:id', authenticateToken, requireAdmin, imagenController.delete.bind(imagenController));

export default router;
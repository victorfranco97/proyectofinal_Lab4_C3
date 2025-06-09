import { Router } from 'express';
import { ImagenController } from '../controllers/imagenController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const imagenController = new ImagenController();

router.get('/imagenes', authenticateToken, imagenController.getAll.bind(imagenController));
router.get('/imagenes/:id', authenticateToken, imagenController.getById.bind(imagenController));
router.post('/imagenes', authenticateToken, imagenController.create.bind(imagenController));
router.put('/imagenes/:id', authenticateToken, imagenController.update.bind(imagenController));
router.delete('/imagenes/:id', authenticateToken, imagenController.delete.bind(imagenController));

export default router;
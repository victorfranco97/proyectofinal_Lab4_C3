import { Router } from 'express';
import { ImagenController } from '../controllers/imagenController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const imagenController = new ImagenController();

router.get('/imagenes', authenticateToken, imagenController.getAll);
router.get('/imagenes/:id', authenticateToken, imagenController.getById);
router.post('/imagenes', authenticateToken, imagenController.create);
router.put('/imagenes/:id', authenticateToken, imagenController.update);
router.delete('/imagenes/:id', authenticateToken, imagenController.delete);

export default router;
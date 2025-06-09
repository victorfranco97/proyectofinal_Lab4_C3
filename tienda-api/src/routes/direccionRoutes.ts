import { Router } from 'express';
import { DireccionController } from '../controllers/direccionController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const direccionController = new DireccionController();

router.post('/direcciones', authenticateToken, direccionController.create.bind(direccionController));
router.get('/direcciones', authenticateToken, direccionController.getAll.bind(direccionController));
router.get('/direcciones/:id', authenticateToken, direccionController.getById.bind(direccionController));
router.put('/direcciones/:id', authenticateToken, direccionController.update.bind(direccionController));
router.delete('/direcciones/:id', authenticateToken, direccionController.delete.bind(direccionController));

export default router;

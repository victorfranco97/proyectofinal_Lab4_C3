import { Router } from 'express';
import { PrecioController } from '../controllers/precioController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const precioController = new PrecioController();

router.get('/precios', authenticateToken, precioController.getAll);
router.get('/precios/:id', authenticateToken, precioController.getById);
router.post('/precios', authenticateToken, precioController.create);
router.put('/precios/:id', authenticateToken, precioController.update);
router.delete('/precios/:id', authenticateToken, precioController.delete);

export default router;
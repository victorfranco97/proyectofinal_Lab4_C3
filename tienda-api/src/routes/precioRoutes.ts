import { Router } from 'express';
import { PrecioController } from '../controllers/precioController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const precioController = new PrecioController();

router.get('/precios', authenticateToken, precioController.getAll.bind(precioController));
router.get('/precios/:id', authenticateToken, precioController.getById.bind(precioController));
router.post('/precios', authenticateToken, precioController.create.bind(precioController));
router.put('/precios/:id', authenticateToken, precioController.update.bind(precioController));
router.delete('/precios/:id', authenticateToken, precioController.delete.bind(precioController));

export default router;
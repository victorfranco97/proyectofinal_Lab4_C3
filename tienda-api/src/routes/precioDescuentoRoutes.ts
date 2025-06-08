import { Router } from 'express';
import { PrecioDescuentoController } from '../controllers/precioDescuentoController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const precioDescuentoController = new PrecioDescuentoController();

router.get('/precio-descuentos', authenticateToken, precioDescuentoController.getAll);
router.get('/precio-descuentos/:id', authenticateToken, precioDescuentoController.getById);
router.post('/precio-descuentos', authenticateToken, precioDescuentoController.create);
router.put('/precio-descuentos/:id', authenticateToken, precioDescuentoController.update);
router.delete('/precio-descuentos/:id', authenticateToken, precioDescuentoController.delete);

export default router;
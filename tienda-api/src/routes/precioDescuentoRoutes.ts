import { Router } from 'express';
import { PrecioDescuentoController } from '../controllers/precioDescuentoController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const precioDescuentoController = new PrecioDescuentoController();

router.get('/precio-descuentos', authenticateToken, precioDescuentoController.getAll.bind(precioDescuentoController));
router.get('/precio-descuentos/:id', authenticateToken, precioDescuentoController.getById.bind(precioDescuentoController));
router.post('/precio-descuentos', authenticateToken, precioDescuentoController.create.bind(precioDescuentoController));
router.put('/precio-descuentos/:id', authenticateToken, precioDescuentoController.update.bind(precioDescuentoController));
router.delete('/precio-descuentos/:id', authenticateToken, precioDescuentoController.delete.bind(precioDescuentoController));

export default router;
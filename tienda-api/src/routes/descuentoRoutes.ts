import { Router } from 'express';
import { DescuentoController } from '../controllers/descuentoController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const descuentoController = new DescuentoController();

router.get('/descuentos', authenticateToken, descuentoController.getAll.bind(descuentoController));
router.get('/descuentos/:id', authenticateToken, descuentoController.getById.bind(descuentoController));
router.post('/descuentos', authenticateToken, descuentoController.create.bind(descuentoController));
router.put('/descuentos/:id', authenticateToken, descuentoController.update.bind(descuentoController));
router.delete('/descuentos/:id', authenticateToken, descuentoController.delete.bind(descuentoController));

export default router;
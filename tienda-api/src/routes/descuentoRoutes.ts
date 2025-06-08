import { Router } from 'express';
import { DescuentoController } from '../controllers/descuentoController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const descuentoController = new DescuentoController();

router.get('/descuentos', authenticateToken, descuentoController.getAll);
router.get('/descuentos/:id', authenticateToken, descuentoController.getById);
router.post('/descuentos', authenticateToken, descuentoController.create);
router.put('/descuentos/:id', authenticateToken, descuentoController.update);
router.delete('/descuentos/:id', authenticateToken, descuentoController.delete);

export default router;
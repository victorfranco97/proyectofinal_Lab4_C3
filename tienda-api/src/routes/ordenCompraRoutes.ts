import { Router } from 'express';
import { OrdenCompraController } from '../controllers/ordenCompraController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const ordenCompraController = new OrdenCompraController();

router.get('/ordenes-compra', authenticateToken, ordenCompraController.getAll);
router.get('/ordenes-compra/:id', authenticateToken, ordenCompraController.getById);
router.post('/ordenes-compra', authenticateToken, ordenCompraController.create);
router.put('/ordenes-compra/:id', authenticateToken, ordenCompraController.update);
router.delete('/ordenes-compra/:id', authenticateToken, ordenCompraController.delete);

export default router;
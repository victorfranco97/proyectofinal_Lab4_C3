import { Router } from 'express';
import { OrdenCompraController } from '../controllers/ordenCompraController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const ordenCompraController = new OrdenCompraController();

router.get('/ordenes-compra', authenticateToken, ordenCompraController.getAll.bind(ordenCompraController));
router.get('/ordenes-compra/:id', authenticateToken, ordenCompraController.getById.bind(ordenCompraController));
router.post('/ordenes-compra', authenticateToken, ordenCompraController.create.bind(ordenCompraController));
router.put('/ordenes-compra/:id', authenticateToken, ordenCompraController.update.bind(ordenCompraController));
router.delete('/ordenes-compra/:id', authenticateToken, ordenCompraController.delete.bind(ordenCompraController));

export default router;
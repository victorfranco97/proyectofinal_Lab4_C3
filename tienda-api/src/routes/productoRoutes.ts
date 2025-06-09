import { Router } from 'express';
import { ProductoController } from '../controllers/productoController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const productoController = new ProductoController();

router.get('/productos', authenticateToken, productoController.getAll.bind(productoController));
router.get('/productos/:id', authenticateToken, productoController.getById.bind(productoController));
router.post('/productos', authenticateToken, productoController.create.bind(productoController));
router.put('/productos/:id', authenticateToken, productoController.update.bind(productoController));
router.delete('/productos/:id', authenticateToken, productoController.delete.bind(productoController));

export default router;
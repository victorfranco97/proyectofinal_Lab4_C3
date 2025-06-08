import { Router } from 'express';
import { ProductoController } from '../controllers/productoController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const productoController = new ProductoController();

router.get('/productos', authenticateToken, productoController.getAll);
router.get('/productos/:id', authenticateToken, productoController.getById);
router.post('/productos', authenticateToken, productoController.create);
router.put('/productos/:id', authenticateToken, productoController.update);
router.delete('/productos/:id', authenticateToken, productoController.delete);

export default router;
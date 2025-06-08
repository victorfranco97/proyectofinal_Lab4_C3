import { Router } from 'express';
import { CategoriaController } from '../controllers/categoriaController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const categoriaController = new CategoriaController();

router.get('/categorias', authenticateToken, categoriaController.getAll);
router.get('/categorias/:id', authenticateToken, categoriaController.getById);
router.post('/categorias', authenticateToken, categoriaController.create);
router.put('/categorias/:id', authenticateToken, categoriaController.update);
router.delete('/categorias/:id', authenticateToken, categoriaController.delete);

export default router;
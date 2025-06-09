import { Router } from 'express';
import { CategoriaController } from '../controllers/categoriaController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const categoriaController = new CategoriaController();

router.get('/categorias', authenticateToken, categoriaController.getAll.bind(categoriaController));
router.get('/categorias/:id', authenticateToken, categoriaController.getById.bind(categoriaController));
router.post('/categorias', authenticateToken, categoriaController.create.bind(categoriaController));
router.put('/categorias/:id', authenticateToken, categoriaController.update.bind(categoriaController));
router.delete('/categorias/:id', authenticateToken, categoriaController.delete.bind(categoriaController));

export default router;
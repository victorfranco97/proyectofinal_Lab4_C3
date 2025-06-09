import { Router } from 'express';
import { TalleController } from '../controllers/talleController';
import {
  authenticateToken,
  requireAdmin,
  requireAdminOrCliente
} from '../middleware/auth';

const router = Router();
const talleController = new TalleController();

// Todos los usuarios autenticados pueden ver talles
router.get('/talles', authenticateToken, requireAdminOrCliente, talleController.getAll.bind(talleController));
router.get('/talles/:id', authenticateToken, requireAdminOrCliente, talleController.getById.bind(talleController));

// Solo admin puede administrar talles
router.post('/talles', authenticateToken, requireAdmin, talleController.create.bind(talleController));
router.put('/talles/:id', authenticateToken, requireAdmin, talleController.update.bind(talleController));
router.delete('/talles/:id', authenticateToken, requireAdmin, talleController.delete.bind(talleController));

export default router;
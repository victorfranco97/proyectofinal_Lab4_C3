import { Router } from 'express';
import { TalleController } from '../controllers/talleController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const talleController = new TalleController();

router.get('/talles', authenticateToken, talleController.getAll);
router.get('/talles/:id', authenticateToken, talleController.getById);
router.post('/talles', authenticateToken, talleController.create);
router.put('/talles/:id', authenticateToken, talleController.update);
router.delete('/talles/:id', authenticateToken, talleController.delete);

export default router; 
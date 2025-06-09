import { Router } from 'express';
import { TalleController } from '../controllers/talleController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const talleController = new TalleController();

router.get('/talles', authenticateToken, talleController.getAll.bind(talleController));
router.get('/talles/:id', authenticateToken, talleController.getById.bind(talleController));
router.post('/talles', authenticateToken, talleController.create.bind(talleController));
router.put('/talles/:id', authenticateToken, talleController.update.bind(talleController));
router.delete('/talles/:id', authenticateToken, talleController.delete.bind(talleController));

export default router;
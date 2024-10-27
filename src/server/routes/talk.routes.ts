import { Router } from 'express';
import { TalkController } from '@/controllers/talk.controller';
import { authenticate, authorize } from '@/middleware/auth.middleware';
import { validateTalk } from '@/middleware/validation';

const router = Router();
const talkController = new TalkController();

router.get('/', talkController.getAllTalks);
router.get('/:id', talkController.getTalkById);
router.post('/', 
  authenticate, 
  authorize('speaker', 'admin'), 
  validateTalk, 
  talkController.createTalk
);
router.put('/:id', 
  authenticate, 
  authorize('speaker', 'admin'), 
  validateTalk, 
  talkController.updateTalk
);
router.delete('/:id', 
  authenticate, 
  authorize('admin'), 
  talkController.deleteTalk
);
router.post('/:id/register', 
  authenticate, 
  authorize('attendee'), 
  talkController.registerForTalk
);

export default router;

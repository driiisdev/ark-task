import { Router } from 'express';
import { SpeakerController } from '@/controllers/speaker.controller';
import { authenticate, authorize } from '@/middleware/auth.middleware';
import { validateSpeakerApplication } from '@/middleware/validation';

const router = Router();
const speakerController = new SpeakerController();

router.post('/apply',
  authenticate,
  validateSpeakerApplication,
  speakerController.applySpeaker
);
router.get('/applications',
  authenticate,
  authorize('admin'),
  speakerController.getApplications
);
router.put('/:id/approve',
  authenticate,
  authorize('admin'),
  speakerController.approveSpeaker
);
router.get('/', speakerController.getAllSpeakers);
router.get('/:id', speakerController.getSpeakerDetails);

export default router;

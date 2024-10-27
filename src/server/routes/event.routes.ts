import { Router } from 'express';
import { EventController } from '@/controllers/event.controller';
import { authenticate, authorize } from '@/middleware/auth.middleware';
import { validateEvent } from '@/middleware/validation';

const router = Router();
const eventController = new EventController();

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/',
  authenticate,
  authorize('admin'),
  validateEvent,
  eventController.createEvent
);
router.put('/:id',
  authenticate,
  authorize('admin'),
  validateEvent,
  eventController.updateEvent
);
router.delete('/:id',
  authenticate,
  authorize('admin'),
  eventController.deleteEvent
);
router.get('/:id/schedule', eventController.getEventSchedule);
router.put('/:id/schedule',
  authenticate,
  authorize('admin'),
  eventController.updateEventSchedule
);

export default router;

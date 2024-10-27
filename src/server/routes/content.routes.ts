import { Router } from 'express';
import { ContentController } from '@/controllers/content.controller';
import { authenticate, authorize } from '@/middleware/auth.middleware';
import { uploadMiddleware } from '@/middleware/upload.middleware';

const router = Router();
const contentController = new ContentController();

router.post('/uploads/presentation',
  authenticate,
  authorize('speaker', 'admin'),
  uploadMiddleware.single('presentation'),
  contentController.uploadPresentation
);
router.delete('/uploads/:id',
  authenticate,
  authorize('speaker', 'admin'),
  contentController.deleteUpload
);
router.get('/resources', contentController.getResources);
router.post('/resources',
  authenticate,
  authorize('admin'),
  contentController.addResource
);
router.delete('/resources/:id',
  authenticate,
  authorize('admin'),
  contentController.deleteResource
);

export default router;

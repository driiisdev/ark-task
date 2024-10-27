import { Router } from 'express';
import { UserController } from '@/controllers/user.controller';
import { authenticate, authorize } from '@/middleware/auth.middleware';
import { validateUserUpdate } from '@/middleware/validation';

const router = Router();
const userController = new UserController();

router.get('/', 
  authenticate, 
  authorize('admin'), 
  userController.getAllUsers
);
router.get('/:id', 
  authenticate, 
  userController.getUserById
);
router.put('/:id', 
  authenticate, 
  validateUserUpdate, 
  userController.updateUser
);
router.delete('/:id', 
  authenticate, 
  authorize('admin'), 
  userController.deleteUser
);
router.put('/:id/role', 
  authenticate, 
  authorize('admin'), 
  userController.updateUserRole
);

export default router;

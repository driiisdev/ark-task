import { Request, Response } from 'express';
import { UserService } from '@/services/user.service';
import { UpdateUserDTO } from '@/dtos/user.dto';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers(req.query);
      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  public updateUserRole = async (req: Request, res: Response) => {
    try {
      const { roleId } = req.body;
      const user = await this.userService.updateUserRole(req.params.id, roleId);
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  // Additional controller methods...
}

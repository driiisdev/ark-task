import { Request, Response } from 'express';
import { AuthService } from '@/services/auth.service';
import { CreateUserDTO } from '@/dtos/user.dto';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public register = async (req: Request, res: Response) => {
    try {
      const userData: CreateUserDTO = req.body;
      const newUser = await this.authService.register(userData);
      res.status(201).json({
        success: true,
        data: newUser
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const { token, user } = await this.authService.login(email, password);
      res.status(200).json({
        success: true,
        token,
        user
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  };

  // Additional controller methods...
}

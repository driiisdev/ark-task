import { User } from '@/models/user.model';
import { Role } from '@/models/role.model';
import { CreateUserDTO } from '@/dtos/user.dto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
  public async register(userData: CreateUserDTO) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const attendeeRole = await Role.findOne({ roleName: 'attendee' });
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = new User({
      ...userData,
      password: hashedPassword,
      roleId: attendeeRole?._id
    });

    await user.save();
    return this.sanitizeUser(user);
  }

  public async login(email: string, password: string) {
    const user = await User.findOne({ email }).populate('role');
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user);
    return { token, user: this.sanitizeUser(user) };
  }

  private generateToken(user: any): string {
    return jwt.sign(
      { userId: user._id, role: user.role.roleName },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  private sanitizeUser(user: any) {
    const sanitized = user.toObject();
    delete sanitized.password;
    return sanitized;
  }
}

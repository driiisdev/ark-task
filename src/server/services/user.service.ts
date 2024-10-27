import { User } from '@/models/user.model';
import { Role } from '@/models/role.model';
import { UpdateUserDTO } from '@/dtos/user.dto';

export class UserService {
  public async getAllUsers(query: any) {
    const { page = 1, limit = 10, role, search } = query;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (role) filter.roleId = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(filter)
      .populate('role')
      .skip(skip)
      .limit(limit)
      .select('-password');

    const total = await User.countDocuments(filter);

    return {
      users,
      total,
      page,
      pages: Math.ceil(total / limit)
    };
  }

  public async updateUserRole(userId: string, roleId: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const role = await Role.findById(roleId);
    if (!role) throw new Error('Role not found');

    user.roleId = roleId;
    await user.save();

    return user.populate('role');
  }

  // Additional service methods...
}

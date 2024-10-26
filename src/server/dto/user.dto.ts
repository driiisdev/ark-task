export class CreateUserDTO {
  email: string;
  name: string;
  password: string;
  roleId: string;
}

export class UpdateUserDTO {
  name?: string;
  password?: string;
  roleId?: string;
}

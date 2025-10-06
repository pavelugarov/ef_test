import { Roles } from "../../../enums/index";

export class User {
  id: number;
  name: string;
  birthday: string;
  email: string;
  role: Roles;
  active: boolean;
  createdAt: string;
}

export class UserEntity extends User {
  password: string;
}
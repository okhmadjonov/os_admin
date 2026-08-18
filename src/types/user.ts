export enum UserRole {
  Admin = 0,
  Ministry = 1,
  Department = 2,
  Edoc = 8,
}

export interface IUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  position?: string;
}

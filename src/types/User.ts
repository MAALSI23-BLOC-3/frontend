export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRegister extends Partial<User> {
  password: string;
}

export interface UserLogin extends Partial<User> {
  password: string;
}

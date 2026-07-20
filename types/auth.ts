export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'worker';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: 'customer' | 'worker';
}

export interface RegisterResponse {
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
}

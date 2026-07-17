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
  password?: string; // made optional/required depending on standard form validation
  role?: 'customer' | 'worker';
}

export interface RegisterResponse {
  user: User;
  token: string;
}

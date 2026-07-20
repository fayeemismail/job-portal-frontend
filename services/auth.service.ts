import { apiClient } from '@/lib/api-client';
import { ApiResponse } from '@/types/api';
import { RegisterPayload, RegisterResponse, LoginPayload, LoginResponse, User } from '@/types/auth';
import { API_ROUTES } from '@/constants/api-routes';

export const authService = {
  /**
   * Registers a new user (customer or worker) on the backend.
   * Auto-authenticates and sets secure HTTP-only cookies on response.
   */
  async register(payload: RegisterPayload): Promise<ApiResponse<RegisterResponse>> {
    return apiClient.post<ApiResponse<RegisterResponse>>(API_ROUTES.AUTH.REGISTER, payload);
  },

  /**
   * Authenticates user credentials on the backend.
   */
  async login(payload: LoginPayload): Promise<ApiResponse<LoginResponse>> {
    return apiClient.post<ApiResponse<LoginResponse>>(API_ROUTES.AUTH.LOGIN, payload);
  },

  /**
   * Refreshes access token and rotates refresh token using HTTP-only cookie.
   */
  async refreshToken(): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>(API_ROUTES.AUTH.REFRESH);
  },

  /**
   * Revokes session and clears HTTP-only authentication cookies.
   */
  async logout(): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>(API_ROUTES.AUTH.LOGOUT);
  },

  /**
   * Retrieves profile for currently authenticated session.
   */
  async getMe(): Promise<ApiResponse<{ user: User }>> {
    return apiClient.get<ApiResponse<{ user: User }>>(API_ROUTES.AUTH.ME);
  },
};

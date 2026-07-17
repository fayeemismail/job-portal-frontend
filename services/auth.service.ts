import { apiClient } from '@/lib/api-client';
import { ApiResponse } from '@/types/api';
import { RegisterPayload, RegisterResponse } from '@/types/auth';
import { API_ROUTES } from '@/constants/api-routes';

export const authService = {
  /**
   * Registers a new user (customer or worker) on the backend
   * @param payload Register fields (name, email, password, role)
   * @returns The standard backend API success response containing the user profile and authorization token
   */
  async register(payload: RegisterPayload): Promise<ApiResponse<RegisterResponse>> {
    return apiClient.post<ApiResponse<RegisterResponse>>(API_ROUTES.AUTH.REGISTER, payload);
  },
};

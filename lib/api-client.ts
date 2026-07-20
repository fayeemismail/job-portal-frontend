import { ApiErrorResponse } from '@/types/api';
import { ENV } from '@/config/env';

export interface ApiRequestInit extends RequestInit {
  _isRetry?: boolean;
}

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string>;

  constructor(message: string, status: number, errors?: Record<string, string>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

const BASE_URL = ENV.apiUrl;

async function request<T>(path: string, options: ApiRequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // Automatically send cookies with request and store cookies from response
  };

  try {
    const response = await fetch(url, config);

    // If it's a 204 No Content response, return empty object/null cast to T
    if (response.status === 204) {
      return {} as T;
    }

    let responseData: unknown;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = { message: await response.text() };
    }

    if (!response.ok) {
      const errorData = responseData as ApiErrorResponse;

      // Auto-refresh token handling on 401 Unauthorized (except for auth attempt endpoints)
      const isAuthEndpoint =
        path.includes('/auth/login') ||
        path.includes('/auth/register') ||
        path.includes('/auth/refresh');

      if (response.status === 401 && !isAuthEndpoint && !options._isRetry) {
        try {
          const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
          });

          if (refreshRes.ok) {
            // Retry the original request once with _isRetry flag set
            return request<T>(path, { ...options, _isRetry: true });
          }
        } catch {
          // Fallthrough to throw original 401 error
        }
      }

      throw new ApiError(
        errorData.message || 'An unexpected error occurred',
        response.status,
        errorData.errors
      );
    }

    return responseData as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error or request failed',
      500
    );
  }
}

export const apiClient = {
  get<T>(path: string, options?: ApiRequestInit): Promise<T> {
    return request<T>(path, { ...options, method: 'GET' });
  },

  post<T>(path: string, body?: unknown, options?: ApiRequestInit): Promise<T> {
    const requestBody = body instanceof FormData ? body : JSON.stringify(body);
    return request<T>(path, { ...options, method: 'POST', body: requestBody });
  },

  put<T>(path: string, body?: unknown, options?: ApiRequestInit): Promise<T> {
    const requestBody = body instanceof FormData ? body : JSON.stringify(body);
    return request<T>(path, { ...options, method: 'PUT', body: requestBody });
  },

  delete<T>(path: string, options?: ApiRequestInit): Promise<T> {
    return request<T>(path, { ...options, method: 'DELETE' });
  },
};

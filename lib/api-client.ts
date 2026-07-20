import { ApiErrorResponse } from '@/types/api';
import { ENV } from '@/config/env';

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

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
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
      throw new ApiError(
        errorData.message || 'An unexpected error occurred',
        response.status,
        errorData.errors
      );
    }

    // Return the response data (usually matching ApiResponse<T> where we return data.data)
    return responseData as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network or other generic client-side errors
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error or request failed',
      500
    );
  }
}

export const apiClient = {
  get<T>(path: string, options?: RequestInit): Promise<T> {
    return request<T>(path, { ...options, method: 'GET' });
  },

  post<T>(path: string, body?: unknown, options?: RequestInit): Promise<T> {
    const requestBody = body instanceof FormData ? body : JSON.stringify(body);
    return request<T>(path, { ...options, method: 'POST', body: requestBody });
  },

  put<T>(path: string, body?: unknown, options?: RequestInit): Promise<T> {
    const requestBody = body instanceof FormData ? body : JSON.stringify(body);
    return request<T>(path, { ...options, method: 'PUT', body: requestBody });
  },

  delete<T>(path: string, options?: RequestInit): Promise<T> {
    return request<T>(path, { ...options, method: 'DELETE' });
  },
};
